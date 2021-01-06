<template>
  <div>
    <v-row>
      <v-col>
        <h2>Test Case Execution Notes</h2>
        <v-select
          v-model="value"
          :items="items"
          item-text="test_plan_name"
          item-value="test_plan_id"
          attach
          chips
          label="Chips"
          multiple
        ></v-select>
        <v-btn class="mt-2" @click="fetchExecutionNotes" color="primary"
          >Search</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col>
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
  </div>
</template>

<script>
import cleanDataMixin from "@/mixins/cleanDataMixin.js";
import jsonexport from "jsonexport";

export default {
  name: "TCExecutionNotes",
  mixins: [cleanDataMixin],

  data: () => ({
    executions: [],
    items: [],
    value: [],
    tableData: [],
    headers: [
      {
        text: "No.",
        align: "start",
        sortable: false,
        value: "index",
      },
      { text: "tester", value: "tester" },
      { text: "notes", value: "notes" },
      { text: "id", value: "tc_external_id" },
      { text: "Test Case", value: "Test Case" },
      { text: "Test Plan", value: "Test Plan" },
      { text: "Test Suite", value: "Test Suite" },
      { text: "DateTime", value: "DateTime" },
    ],
    canDownload: true,
  }),

  async created() {
    await this.fetchTestPlan();
  },

  methods: {
    async fetchTestPlan() {
      try {
        let response = await fetch("/api/getTestPlans");
        let data = await response.json();
        this.value = [];
        this.items = data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchExecutionNotes() {
      try {
        this.tableData = [];
        let response = await fetch(
          "/api/executionNotes?test_plan_id=" + this.value.toString()
        );
        let data = await response.json();
        console.log(data);
        this.executions = data;
        this.tableData = this.cleanData(this.executions);
      } catch (error) {
        console.error(error);
      }
    },
    cleanData(originalData) {
      let cleanedData = originalData;
      cleanedData.forEach((data, index) => {
        this.removeTag(data, "Test Plan", "p");
        data.index = index + 1;
      });
      this.canDownload = false;
      return cleanedData;
    },
    downloadCSV() {
      jsonexport(this.tableData, (err, csv) => {
        if (err) return console.error(err);
        this.download(`${"TCExecutionNotes"}-${Date.now()}.csv`, csv);
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
