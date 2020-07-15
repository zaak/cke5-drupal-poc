<?php

namespace Drupal\ckeditor5\Plugin\Editor;

use Drupal\Core\Form\FormStateInterface;
use Drupal\editor\Plugin\EditorBase;
use Drupal\editor\Entity\Editor;

/**
 * Defines a CKEditor 5-based text editor for Drupal.
 *
 * @Editor(
 *   id = "ckeditor5",
 *   label = @Translation("CKEditor 5"),
 *   supports_content_filtering = TRUE,
 *   supports_inline_editing = TRUE,
 *   is_xss_safe = TRUE,
 *   supported_element_types = {
 *     "textarea"
 *   }
 * )
 *
 * @todo verify the `supports_content_filtering` annotation is correct.
 * @todo verify the `is_xss_safe` annotation is correct.
 */
class CKEditor5 extends EditorBase {

  /**
   * {@inheritdoc}
   */
  public function getDefaultSettings() {
    // @todo
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state, Editor $editor) {
    // @todo
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function settingsFormSubmit(array $form, FormStateInterface $form_state) {
    // @todo
  }

  /**
   * {@inheritdoc}
   */
  public function getJSSettings(Editor $editor) {
    // @todo
    return ['aaaaaaaaaaaaaa' => 'zzzzz'];
  }

  /**
   * {@inheritdoc}
   */
  public function getLibraries(Editor $editor) {
    return [
      'ckeditor5/drupal.ckeditor5',
    ];
  }

}
