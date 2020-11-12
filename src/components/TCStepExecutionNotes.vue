<template>
  <v-row>
    <v-col class="mb-4">
      <h2>Test Case Steps Execution Notes</h2>
      <v-btn
        class="mt-2"
        :disabled="canDownload"
        @click="downloadCSV"
        color="primary"
        >Export</v-btn
      >
      <v-data-table
        dense
        :headers="headers"
        :items="tableData"
        item-key="name"
        class="elevation-1"
      ></v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import cleanDataMixin from "@/mixins/cleanDataMixin.js";
import jsonexport from "jsonexport";

export default {
  name: "TCStepExecutionNotes",
  mixins: [cleanDataMixin],

  data: () => ({
    executions: [],
    tableData: [],
    headers: [
      {
        text: "tester",
        align: "start",
        sortable: false,
        value: "tester",
      },
      { text: "execution note", value: "execution note" },
      { text: "action", value: "action" },
      { text: "expected result", value: "expected result" },
      { text: "step no", value: "step no" },
      { text: "TC id", value: "test case eid" },
      { text: "Test Case", value: "Test Case" },
      { text: "Test Plan", value: "Test Plan" },
      { text: "Test Suite", value: "Test Suite" },
      { text: "DateTime", value: "DateTime" },
    ],
    canDownload: true,
  }),

  async created() {
    try {
      let response = await fetch("/api/stepExecutionNotes");
      let data = await response.json();
      this.executions = data;

      this.tableData = await this.cleanData(this.executions);
    } catch (error) {
      console.error(error);
    }
  },

  methods: {
    async cleanData(originalData) {
      let cleanedData = originalData;
      cleanedData.forEach((data) => {
        this.removeTag(data, "Test Plan", "p");
        this.cleanColumn(data, "action");
        this.cleanColumn(data, "expected result");
      });
      return cleanedData;
    },
    async cleanColumn(data, props) {
      if (data[props].includes("ghost")) {
        let msg = data[props];
        while (msg.includes("ghost")) {
          try {
            this.canDownload = true;
            const regexp = /[0-9]?\d+/g;
            const array = [...msg.matchAll(regexp)];
            array[0] = array[0][0];
            array[1] = array[1][0];
            array[2] = array[2][0];

            let response = await fetch(
              `/api/getGhostString?step=${array[0]}&tc=${array[1]}`
            );
            let result = await response.json();
            msg = result[0][props];
            this.canDownload = false;
          } catch (error) {
            console.error(error);
          }
        }
        data[props] = msg;
      }
      if (data[props].includes("<p>")) {
        this.removeTag(data, props, "p");
        this.removeTag(data, props, "emstrong");
        this.removeTag(data, props, "quote");
      }
    },
    downloadCSV() {
      jsonexport(this.tableData, (err, csv) => {
        if (err) return console.error(err);
        this.download(`${"TCStepExecutionNotes"}-${Date.now()}.csv`, csv);
      });
    },
    download(filename, text) {
      let element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
      );
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
  },
};
</script>
