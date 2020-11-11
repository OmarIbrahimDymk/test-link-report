<template>
  <v-row>
    <v-col class="mb-4">
      <h2>Test Case Steps Execution Notes</h2>
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
  name: "TCStepExecutionNotes",

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
      { text: "action", value: "action" },
      { text: "execution note", value: "execution note" },
      { text: "expected result", value: "expected result" },
      { text: "step no", value: "step no" },
      { text: "TC id", value: "test case eid" },
      { text: "tester", value: "tester" },
    ],
  }),

  async created() {
    let response = await fetch("/api/stepExecutionNotes");
    let data = await response.json();
    this.executions = data;
    console.log("stepExecutionNotes: ", this.executions);
  },
};
</script>
