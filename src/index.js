import postcss from 'postcss';

const moveMedia = (child) => {
	const parent = child.parent;

	const childClone = child.clone();
	childClone.params = `${parent.params} and ${childClone.params}`;
	parent.parent.insertAfter(parent, childClone);
	return childClone;
};

export default postcss.plugin('postcss-nested-media-queries', () => (css) => {
	css.walkAtRules((rule) => {
		if (rule.name !== 'media' || !rule.nodes) {
			return;
		}

		let newMediaContainer = null;
		let latestMovedMedia = false;
		const nodesForRemoving = [];

		rule.nodes.forEach((node) => {
			if (node.type === 'atrule' && node.name === 'media') {
				latestMovedMedia = moveMedia(node);
				nodesForRemoving.push(node);
			} else if (node.type === 'rule' || node.type === 'comment') {
				if (latestMovedMedia && !newMediaContainer) {
					newMediaContainer = postcss.atRule({
						name: 'media',
						params: node.parent.params,
						raws: node.parent.raws
					});
					node.parent.parent.insertAfter(latestMovedMedia, newMediaContainer);
				}

				if (newMediaContainer) {
					newMediaContainer.append(node);
					nodesForRemoving.push(node);
				}
			}
		});

		nodesForRemoving.forEach(node => node.remove());

		if (!rule.nodes.length) {
			rule.remove();
		}
	});
});
