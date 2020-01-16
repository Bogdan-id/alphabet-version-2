<template>
<div v-if="temporaryObj">
	<CountCard
		v-for="(value, index) in 10"
		:key="index"
		:temporaryObj="temporaryObj"
		:value="value"
		>
	</CountCard>
</div>
</template>

<script>
import CountCard from './CountCard.vue'

export default {
	props: [
		'temporaryObj',
	],
	components: {
		CountCard
	}
}
</script>