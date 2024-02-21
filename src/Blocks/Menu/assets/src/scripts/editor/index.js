import { __ } from '@wordpress/i18n';
import { getBlockDefaultClassName, registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { SelectControl, PanelBody, Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { menu as icon } from '@wordpress/icons';

import block_json from '../../../../block.json';
const { name: blockName } = block_json;
const classNameBase = getBlockDefaultClassName(blockName);

import './data-store';

registerBlockType(blockName, {
	icon,
	edit: ({ attributes, setAttributes, clientId }) => {
		const { menu } = attributes;

		setAttributes({ blockId: clientId });

		const menus = useSelect((select) => {
			return select('sht/menu-positions').getEntries();
		});

		const options = menus
			? menus.map((menu) => ({
					label: menu.title,
					value: menu.id,
			  }))
			: [];

		const blockProps = useBlockProps();

		return (
			<div {...blockProps}>
				<InspectorControls>
					<PanelBody title={__('Options', 'sht')} initialOpen={true}>
						{!menus && <Spinner />}
						{menus && <SelectControl label={__('Select a pre-defined menu', 'sht')} value={menu} onChange={(newMenu) => setAttributes({ menu: newMenu })} options={options} />}
					</PanelBody>
				</InspectorControls>
				<div className={`${classNameBase}__editorplaceholder`}>
					{menu && (
						<div
							dangerouslySetInnerHTML={{
								__html: __('Menu «%s»', 'sht').replace('%s', menu),
							}}
						/>
					)}
					{!menu && <div dangerouslySetInnerHTML={{ __html: __('No menu selected', 'sht') }} />}
				</div>
			</div>
		);
	},
});
