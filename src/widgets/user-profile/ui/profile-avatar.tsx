'use client';

import Image from 'next/image';
import { Upload, X } from 'lucide-react';

import type { User } from '@/entities/user';

import { useProfileAvatar } from '../model/use-profile-avatar';
import { getInitials } from '@/shared/lib/user/get-initials';

interface ProfileAvatarProps {
  user: User;
  canEdit: boolean;
  disabled: boolean;
  setDisabled: (value: boolean) => void;
}

export function ProfileAvatar({ user, canEdit, disabled, setDisabled }: ProfileAvatarProps) {
  const {
    inputRef,

    loading,
    isDragging,

    handleClick,
    handleFileSelect,

    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,

    handleDelete,
  } = useProfileAvatar({
    userId: user.id,
    canEdit,
    setDisabled,
  });

  const initials = getInitials({
    firstName: user.profile.first_name,
    lastName: user.profile.last_name,
    email: user.email,
  });

  const isDisabled = disabled || loading || !canEdit;

  return (
    <div className="flex items-center flex-col gap-4 sm:gap-16 sm:flex-row">
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={isDragging ? 'relative rounded-full ring-2 ring-destructive' : 'relative'}
      >
        <button
          type="button"
          onClick={handleClick}
          disabled={isDisabled}
          className="cursor-pointer rounded-full disabled:cursor-default"
        >
          <div className="relative h-30 w-30 overflow-hidden rounded-full shrink-0">
            {user.profile.avatar ? (
              <Image
                src={user.profile.avatar}
                alt={user.profile.full_name ?? user.email}
                fill
                sizes="120px"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-ring text-[42px] text-primary-foreground">
                {initials}
              </div>
            )}
          </div>
        </button>
        {canEdit && user.profile.avatar && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDisabled}
            className="
                  absolute
                  right-1
                  top-1
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-primary-foreground
                  shadow-md
                  transition-colors
                  hover:bg-red-100
                  cursor-pointer
                  disabled:pointer-events-none
                "
          >
            <X className="h-4 w-4 text-destructive" />
          </button>
        )}
      </div>

      {canEdit && (
        <div className="flex flex-col items-center">
          <input
            ref={inputRef}
            type="file"
            accept=".png,.jpg,.jpeg,.gif"
            className="hidden"
            onChange={handleFileSelect}
          />

          <button
            type="button"
            disabled={isDisabled}
            onClick={handleClick}
            className="flex items-center gap-4 text-[20px] font-medium text-primary cursor-pointer disabled:cursor-default"
          >
            <Upload className="h-7 w-7" />
            {loading ? 'Uploading...' : 'Upload avatar image'}
          </button>

          <p className="text-base text-muted-foreground">png, jpg or gif no more than 0.5MB</p>
        </div>
      )}
    </div>
  );
}
