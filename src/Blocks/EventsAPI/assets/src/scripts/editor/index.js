import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { TextControl, PanelBody } from '@wordpress/components';
import { _x } from '@wordpress/i18n';

import block_json from '../../../../block.json';
const { name: block_name } = block_json;

registerBlockType(block_name, {
	edit: ({ attributes, setAttributes }) => {
		const blockProps = useBlockProps();
		const { apiUrl } = attributes;

		return (
			<>
				<InspectorControls>
					<PanelBody title="Settings" initialOpen={true}>
						<TextControl
							label="API URL"
							value={apiUrl}
							onChange={(value) => {
								setAttributes({ apiUrl: value });
							}}
						/>
					</PanelBody>
				</InspectorControls>
				<div {...blockProps}>
					<div className="c-editormessage">
						<p>
							<strong
								dangerouslySetInnerHTML={{
									__html: _x('Events from API', 'Block editor message', 'wpswitzerland-fse'),
								}}
							/>
						</p>
						<p
							dangerouslySetInnerHTML={{
								__html: _x('The latest events will be collected from the API and displayed here.', 'Block editor message', 'wpswitzerland-fse'),
							}}
						/>
					</div>
				</div>
			</>
		);
	},
});
