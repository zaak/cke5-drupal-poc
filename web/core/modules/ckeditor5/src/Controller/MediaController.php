<?php

namespace Drupal\ckeditor5\Controller;

use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Drupal\Core\Entity\ContentEntityStorageInterface;
use Drupal\Core\Entity\EntityRepositoryInterface;
use Drupal\Core\Render\RendererInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Drupal\media\Entity\Media;
use Drupal\file\Entity\File;

class MediaController implements ContainerInjectionInterface
{
    /**
     * The renderer service.
     *
     * @var \Drupal\Core\Render\RendererInterface
     */
    protected $renderer;

    /**
     * The media storage.
     *
     * @var \Drupal\Core\Entity\ContentEntityStorageInterface
     */
    protected $mediaStorage;

    /**
     * The entity repository.
     *
     * @var \Drupal\Core\Entity\EntityRepositoryInterface
     */
    protected $entityRepository;

    public function __construct(RendererInterface $renderer, ContentEntityStorageInterface $media_storage, EntityRepositoryInterface $entity_repository) {
        $this->renderer = $renderer;
        $this->mediaStorage = $media_storage;
        $this->entityRepository = $entity_repository;
    }

    /**
     * {@inheritdoc}
     */
    public static function create(ContainerInterface $container) {
        return new static(
            $container->get('renderer'),
            $container->get('entity_type.manager')->getStorage('media'),
            $container->get('entity.repository')
        );
    }


    public function preview(Request $request) {
        $uuid = $request->get('uuid');
        $media = $this->entityRepository->loadEntityByUuid('media', $uuid);
        $fid = $media->field_media_image->target_id;
        $file = File::load($fid);
        $uri = $file->getFileUri();

        return new Response(file_get_contents($uri), 200, [
            'Content-Type' => $file->getMimeType(),
        ]);
    }
}
