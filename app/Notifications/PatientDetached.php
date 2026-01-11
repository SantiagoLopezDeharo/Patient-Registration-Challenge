<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PatientDetached extends Notification implements ShouldQueue
{
    use Queueable;

    protected $patientName;
    protected $removedBy;

    public function __construct(string $patientName, ?string $removedBy = null)
    {
        $this->patientName = $patientName;
        $this->removedBy = $removedBy;
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $recipient = $this->patientName ?? '';
        $removedBy = $this->removedBy ?? 'the account owner';

        $greeting = 'Hi' . ($recipient !== '' ? ' ' . $recipient : '') . ',';

        return (new MailMessage)
            ->subject('Patient Deregistration Notification')
            ->greeting($greeting)
            ->line('You have been removed from the patients list of ' . $removedBy . '.')
            ->line('If this was a mistake, please contact ' . $removedBy . '.');
    }

    public function toArray(object $notifiable): array
    {
        return [];
    }
}
