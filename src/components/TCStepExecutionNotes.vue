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
        :items="executions"
        item-key="name"
        class="elevation-1"
      ></v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import jsonexport from "jsonexport";

export default {
  name: "TCStepExecutionNotes",

  data: () => ({
    executions: [],
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
    let response = await fetch("/api/stepExecutionNotes");
    let data = await response.json();
    this.executions = data;
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
