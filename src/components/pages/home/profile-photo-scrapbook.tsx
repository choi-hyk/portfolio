"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

const photos = [
  { src: "/images/profile/coding.jpeg", alt: "노트북으로 작업하는 모습" },
  { src: "/images/profile/everyday.jpeg", alt: "일상의 모습" },
  { src: "/images/profile/seaside.jpeg", alt: "바닷가에서 찍은 여행 사진" },
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function ProfilePhotoScrapbook({ label }: { label: string }) {
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
      <div className="home-photo-scrapbook" aria-label={label}>
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            className={`home-photo-card home-photo-card-${index + 1}`}
            aria-label={`${photo.alt} 확대`}
            onClick={(event) => {
              event.stopPropagation();
              setSelectedPhoto(photo);
            }}
          >
            <Image
              src={`${basePath}${photo.src}`}
              alt={photo.alt}
              width={800}
              height={1200}
              sizes="180px"
            />
          </button>
        ))}
      </div>
      {selectedPhoto
        ? createPortal(
            <div
              className="home-photo-lightbox"
              role="dialog"
              aria-modal="true"
              aria-label={selectedPhoto.alt}
              onClick={() => setSelectedPhoto(null)}
            >
              <button
                type="button"
                className="home-photo-lightbox-close"
                aria-label="확대 사진 닫기"
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
