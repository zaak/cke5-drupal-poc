import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import {toWidget, toWidgetEditable, findOptimalInsertionPosition} from '@ckeditor/ckeditor5-widget/src/utils';
import browseFilesIcon from "@ckeditor/ckeditor5-ckfinder/theme/icons/browse-files.svg";


export default class CustomElemUI extends Plugin {


	init() {
		const editor = this.editor;
		const attributes = ['data-align', 'data-entity-type', 'data-entity-uuid'];

		editor.model.schema.register('drupalMedia', {
			allowIn: '$root',
			allowAttributes: attributes,
			isObject: true,
			isBlock: true,
		});


		//---conversion
		editor.conversion.for('editingDowncast').elementToElement(
			({
				model: 'drupalMedia',
				view: (modelItem, viewWriter) => {
					let attrs = modelItem.getAttributes();
					let uuid = null;

					Array.from(attrs).map(([key, value]) => {
						console.log(key, value);
						if (key === 'data-entity-uuid') {
							uuid = value;
						}
					});

					console.log(uuid);

					let widgetElement = viewWriter.createContainerElement('img', {
						src: '/ckeditor5/media/preview/' + uuid
					});
					// console.log(widgetElement);
					return toWidgetEditable(widgetElement, viewWriter);
				}
			})
		);

		editor.conversion.for('dataDowncast').elementToElement(
			({
				model: 'drupalMedia',
				view: 'drupal-media'
			})
		);

		editor.conversion.for('upcast').elementToElement(
			({
				view: 'drupal-media',
				model: 'drupalMedia'
			})
		);

		for (let a = 0; a < attributes.length; a++) {
			editor.conversion.for('downcast').attributeToAttribute(({
				model: attributes[a],
				view: attributes[a],
				converterPriority: 'low'
			}));
			editor.conversion.for('upcast').attributeToAttribute({
				view: attributes[a],
				model: attributes[a],
				converterPriority: 'low'
			});
		}


		// btn
		const componentFactory = editor.ui.componentFactory;
		const t = editor.t;

		componentFactory.add('dmedia', locale => {
			//const command = editor.commands.get( 'ckfinder' );

			const button = new ButtonView(locale);

			button.set({
				label: t('Insert image or file'),
				icon: browseFilesIcon,
				tooltip: true
			});

			// button.bind( 'isEnabled' ).to( command );

			button.on('execute', () => {
				var dialogSettings = {
					dialogClass: "media-library-widget-modal ui-dialog--narrow",
					title: "Add or select media",
					height: "75%",
					width: "auto",
					autoResize: true
				};
				var classes = dialogSettings.dialogClass ? dialogSettings.dialogClass.split(' ') : [];
				classes.push('ui-dialog--narrow');
				dialogSettings.dialogClass = classes.join(' ');
				dialogSettings.autoResize = window.matchMedia('(min-width: 600px)').matches;
				dialogSettings.width = 'auto';

				var ckeditorAjaxDialog = Drupal.ajax({
					dialog: dialogSettings,
					dialogType: 'modal',
					selector: '.ckeditor-dialog-loading-link',
					url: '/media-library?media_library_opener_id=media_library.opener.editor&media_library_allowed_types%5B0%5D=image&media_library_selected_type=image&media_library_remaining=1&media_library_opener_parameters%5Bfilter_format_id%5D=basic_html&hash=TdGN2_pXRMptwXmk_-cJzO52Gfna-ZrWaPhq99ej6go',
					progress: {type: 'throbber'},
					submit: {
						editor_object: null
					}
				});
				ckeditorAjaxDialog.execute();

// ------

				window.Drupal.ckeditor.saveCallback = function saveCallback(values) {
					console.log(values);

					const model = editor.model;

					model.change(writer => {
						//let src = '/ckeditor5/media/preview/'+values.attributes['data-entity-uuid'];
						//insertImage( writer, model, { src } );

						const drupalMediaElement = writer.createElement('drupalMedia', values.attributes);

						const insertAtSelection = findOptimalInsertionPosition(model.document.selection, model);

						model.insertContent(drupalMediaElement, insertAtSelection);
					});
				};
			});

			return button;
		});


	}

	_safeGet(input, safeDefault) {
		if (typeof input !== 'undefined' && (input || input === false || input === 0)) {
			return input;
		}
		else {
			return safeDefault;
		}
	}
}
