<template>
    <v-card flat class="pa-4 my-4" rounded-lg>
        <h4>Security</h4>

        <div class="security-card-grid mt-2">
        <v-card color="#f8fafc" flat>
            <div><v-icon color="#32c36c">mdi-check-circle</v-icon></div>
            <div>Web5 DID enabled</div>
        </v-card>

        <v-card color="#f8fafc" flat>
            <div><v-icon color="#32c36c">mdi-check-circle</v-icon></div>
            <div>VC available</div>
        </v-card>
        </div>
    </v-card>
</template>


<script>
export default {
    
}
</script>


<style scoped>
.security-card-grid{
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1fr;
}

.security-card-grid > * {
    padding: 8px 10px
}
</style>