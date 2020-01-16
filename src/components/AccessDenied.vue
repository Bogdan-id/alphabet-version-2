<template>
    <v-row class="justify-center mt-12">
        <v-col md="4">
            <v-card>
                <v-card-title class="justify-center">
                    {{message}}
                </v-card-title>
                <v-card-actions class="justify-center">
                    <v-icon class="pb-6" color="red lighten-2" size="90" v-text="'mdi-account-alert'">
                    </v-icon>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
	data: () => ({
		message: 'Access denied...',
	})
}
</script>