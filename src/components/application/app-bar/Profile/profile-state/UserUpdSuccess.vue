<template>
<v-card
	class="update-success ma-2"
	>
	<v-card-title class="title justify-center">
		<v-icon class="ma-4" size="70px" v-text="'fas fa-user-shield'">
		</v-icon>
	</v-card-title>
	<v-card-text class="justify-center">
		<div class="title text-center">
			Complete
		</div>
	</v-card-text>
	<v-card-actions class="justify-center pa-0">
		<v-btn 
			class="update-complete-btn" 
			large color="primary" 
			text icon
			>
			<v-icon v-text="'fas fa-reply'"></v-icon>
		</v-btn>
	</v-card-actions>
</v-card>
</template>

<script>
export default {
	data: () => ({
		
	})
}
</script>