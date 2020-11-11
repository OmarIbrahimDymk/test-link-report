<template>
  <v-container>
    <h1 class="display-2 font-weight-bold mb-3">TestLink Reports</h1>
    <hr />
    <TCExecutionNotes />
    <TCStepExecutionNotes />
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
};
</script>
