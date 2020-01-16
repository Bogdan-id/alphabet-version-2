<template>
	<v-card v-if="index !== null">
		<v-card-title>
			{{ items.object[index]['title'] }}
		</v-card-title>
		<v-card-text>
			{{ items.object[index]['message'] }}
		</v-card-text>
		<v-card-text>
			{{ items.object[index]['date'] }}
		</v-card-text>
		<v-card-actions>
			<v-btn @click="$emit('listenAllMessage')" text>to messages</v-btn>
			<v-spacer></v-spacer>
			<v-btn @click="$emit('listenToClose')" text>close</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	props: ['index', 'items'],
	data: () => ({

	}),
}
</script>