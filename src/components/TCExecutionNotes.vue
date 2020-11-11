<template>
  <v-row>
    <v-col class="mb-4">
      <h2>Test Case Execution Notes</h2>
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
export default {
  name: "TCExecutionNotes",

  data: () => ({
    executions: [],
    headers: [
      {
        text: "DateTime",
        align: "start",
        sortable: false,
        value: "DateTime",
      },
      { text: "Test Case", value: "Test Case" },
      { text: "Test Plan", value: "Test Plan" },
      { text: "Test Suite", value: "Test Suite" },
      { text: "notes", value: "notes" },
      { text: "id", value: "tc_external_id" },
      { text: "tester", value: "tester" },
    ],
  }),

  async created() {
    let response = await fetch("/api/executionNotes");
    let data = await response.json();
    this.executions = data;
    console.log("executionNotes: ", this.executions);
  },
};
</script>
