<template>
  <v-container>
    <h1 class="display-2 font-weight-bold mb-3">TestLink Reports</h1>
    <hr />
    <v-btn class="mt-2" @click="updateButton" color="primary"
      >View {{ tableName }}</v-btn
    >
    <TCExecutionNotes v-show="tableState" />
    <TCStepExecutionNotes v-show="!tableState" />
  </v-container>
</template>

<script>
// @ is an alias to /src
import TCExecutionNotes from "@/components/TCExecutionNotes.vue";
import TCStepExecutionNotes from "@/components/TCStepExecutionNotes.vue";

export default {
  name: "Home",
  components: {
    TCExecutionNotes,
    TCStepExecutionNotes,
  },
  data() {
    return {
      tableName: "TC Step Execution Notes",
      tableState: true,
    };
  },
  methods: {
    updateButton() {
      this.tableName = this.tableState
        ? "TC Execution Notes"
        : "TC Step Execution Notes";
      this.tableState = !this.tableState;
    },
  },
};
</script>
