"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

const photos = [
  {
    src: "/images/profile/coding.jpeg",
    alt: "Working with a laptop",
    className: "profile-photo-card profile-photo-card-primary",
  },
  {
    src: "/images/profile/everyday.jpeg",
    alt: "A casual everyday moment",
    className: "profile-photo-card profile-photo-card-secondary",
  },
  {
    src: "/images/profile/seaside.jpeg",
    alt: "A seaside travel moment",
    className: "profile-photo-card profile-photo-card-tertiary",
  },
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function ProfilePhotoGallery({ label }: { label: string }) {
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photos)[number] | null>(
    null,
  );

  useEffect(() => {
    if (!selectedPhoto) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedPhoto(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedPhoto]);

  return (
    <>
      <div className="intro-photo-gallery" aria-label={label}>
        {photos.map((photo) => (
          <button
            key={photo.src}
            type="button"
            className={photo.className}
            aria-label={`${photo.alt} — enlarge photo`}
            onClick={() => setSelectedPhoto(photo)}
          >
            <Image
              src={`${basePath}${photo.src}`}
              alt={photo.alt}
              width={800}
              height={1200}
              sizes="120px"
            />
          </button>
        ))}
      </div>
      {selectedPhoto
        ? createPortal(
            <div
              className="profile-photo-lightbox"
              role="dialog"
              aria-modal="true"
              aria-label={selectedPhoto.alt}
              onClick={() => setSelectedPhoto(null)}
            >
              <button
                type="button"
                className="profile-photo-lightbox-close"
                aria-label="Close enlarged photo"
                onClick={() => setSelectedPhoto(null)}
              >
                ×
              </button>
              <Image
                src={`${basePath}${selectedPhoto.src}`}
                alt={selectedPhoto.alt}
                width={1600}
                height={2400}
                sizes="90vw"
                onClick={(event) => event.stopPropagation()}
              />
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
