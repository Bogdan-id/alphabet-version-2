<template>
<div class="d-inline-flex flex-wrap justify-center">
	<ColorsCard
		v-for="(value, index) in temporaryObj"
		:value="value"
		:key="index"
		:iterValue="index"
		>
	</ColorsCard>
</div>
</template>

<script>
import ColorsCard from './ColorsCard.vue'

export default {
	props: [
		'windowSize',
		'temporaryObj',
	],
	components: {
		ColorsCard,
	},
	mounted() {
		console.log(this.temporaryObj)
	}
}
</script>