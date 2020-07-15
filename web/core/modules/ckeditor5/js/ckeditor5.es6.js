/**
 * @file
 * CKEditor 5 implementation of {@link Drupal.editors} API.
 */

(function(Drupal, ClassicEditor, CKEditorInspector) {
	/**
	 * @namespace
	 */
	Drupal.editors.ckeditor5 = {
		/**
		 * Editor attach callback.
		 *
		 * @param {HTMLElement} element
		 *   The element to attach the editor to.
		 * @param {string} format
		 *   The text format for the editor.
		 *
		 * @return {bool}
		 *   Whether attaching a `<textarea>` CKEditor 5 instance succeeded.{tag: 'tagname1', placeholder: 'some text',
					attributes:{name:'ABCD'}, icon:Icon1,
					inline:false, editable:false}
		 */
		attach(element, format) {
			ClassicEditor
				.create(element, {
					// @todo https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editorconfig-EditorConfig.html
					// extraPlugins: …
					language: 'en',
					// toolbar: …
					// …
				})
				.then(editor => {
					CKEditorInspector.attach(editor);
					window.editor = editor;
				})
				.catch(error => {
					console.error(error);
					return false;
				});

			return true;
		},

		/**
		 * Editor detach callback.
		 *
		 * @param {HTMLElement} element
		 *   The element to detach the editor from.
		 * @param {string} format
		 *   The text format used for the editor.
		 * @param {string} trigger
		 *   The event trigger for the detach.
		 *
		 * @return {bool}
		 *   Whether detaching the CKEditor 5 instance succeeded.
		 */
		detach(element, format, trigger) {
			// @todo
			return false;
		},

		/**
		 * Reacts on a change in the editor element.
		 *
		 * @param {HTMLElement} element
		 *   The element where the change occurred.
		 * @param {function} callback
		 *   Callback called with the value of the editor.
		 *
		 * @return {bool}
		 *   Whether listening for changes on the CKEditor 5 instance succeeded.
		 */
		onChange(element, callback) {
			callback(window.editor.getData());
			return true;
		},

		/**
		 * Attaches an inline editor to a DOM element.
		 *
		 * @param {HTMLElement} element
		 *   The element to attach the editor to.
		 * @param {object} format
		 *   The text format used in the editor.
		 * @param {string} [mainToolbarId]
		 *   The id attribute for the main editor toolbar, if any.
		 * @param {string} [floatedToolbarId]
		 *   The id attribute for the floated editor toolbar, if any.
		 *
		 * @return {bool}
		 *   Whether attaching an inline CKEditor 5 instance succeeded.
		 */
		// attachInlineEditor(element, format, mainToolbarId, floatedToolbarId) {
		//   InlineCKEditor
		//     .create(element, {
		//       // @todo
		//     })
		//     .catch(error => {
		//       console.error(error);
		//       return false;
		//     });
		//   return true;
		// },
	};

	// Redirect on hash change when the original hash has an associated CKEditor.
	// @todo

	// Set the CKEditor cache-busting string to the same value as Drupal.
	// @todo

	// // Moves the dialog to the top of the CKEDITOR stack.
	// $(window).on('dialogcreate', (e, dialog, $element, settings) => {
	// 	$('.ui-dialog--narrow').css('zIndex', CKEDITOR.config.baseFloatZIndex + 1);
	// });
	//
	// // Respond to new dialogs that are opened by CKEditor, closing the AJAX loader.
	// $(window).on('dialog:beforecreate', (e, dialog, $element, settings) => {
	// 	$('.ckeditor-dialog-loading').animate({ top: '-40px' }, function() {
	// 		$(this).remove();
	// 	});
	// });
	//
	// // Respond to dialogs that are saved, sending data back to CKEditor.
	// $(window).on('editor:dialogsave', (e, values) => {
	// 	if (Drupal.ckeditor.saveCallback) {
	// 		Drupal.ckeditor.saveCallback(values);
	// 	}
	// });
	//
	// // Respond to dialogs that are closed, removing the current save handler.
	// $(window).on('dialog:afterclose', (e, dialog, $element) => {
	// 	if (Drupal.ckeditor.saveCallback) {
	// 		Drupal.ckeditor.saveCallback = null;
	// 	}
	// });

})(
	Drupal,
	ClassicEditor,
	// InlineEditor,
	CKEditorInspector,
);

/**
 * @file
 * AJAX commands used by Editor module.
 */

(function($, Drupal) {
	/**
	 * Command to save the contents of an editor-provided modal.
	 *
	 * This command does not close the open modal. It should be followed by a
	 * call to `Drupal.AjaxCommands.prototype.closeDialog`. Editors that are
	 * integrated with dialogs must independently listen for an
	 * `editor:dialogsave` event to save the changes into the contents of their
	 * interface.
	 *
	 * @param {Drupal.Ajax} [ajax]
	 *   The Drupal.Ajax object.
	 * @param {object} response
	 *   The server response from the ajax request.
	 * @param {Array} response.values
	 *   The values that were saved.
	 * @param {number} [status]
	 *   The status code from the ajax request.
	 *
	 * @fires event:editor:dialogsave
	 */
	Drupal.AjaxCommands.prototype.editorDialogSave = function(
		ajax,
		response,
		status,
	) {
		$(window).trigger('editor:dialogsave', [response.values]);
	};
})(jQuery, Drupal);
