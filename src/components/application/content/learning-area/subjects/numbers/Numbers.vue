<template>
<div class="d-inline-flex flex-wrap justify-center">
	<NumbersCard
		v-for="(value, index) in temporaryObj"
		:value="value"
		:key="index"
		:windowSize="windowSize"
		>
	</NumbersCard>
</div>
</template>

<script>
import NumbersCard from './NumbersCard.vue'
export default {
	props: [
		'temporaryObj',
		'windowSize',
	],
	data: () => ({

	}),
	methods: {

	},
	computed: {

	},
	components: {
		NumbersCard
	},
}
</script>