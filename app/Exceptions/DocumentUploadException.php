<?php

namespace App\Exceptions;

use RuntimeException;
use Throwable;

class DocumentUploadException extends RuntimeException
{
    public static function timeout(int $seconds): self
    {
        return new self("File upload did not complete in time ({$seconds}s).");
    }

    public static function failed(?Throwable $previous = null): self
    {
        return new self('File upload failed.', 0, $previous);
    }
}
