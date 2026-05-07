"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const schema = z.object({
  nom: z.string().min(2, "Nom requis (2 caractères minimum)"),
  email: z.string().email("Adresse e-mail invalide"),
  objet: z.string().min(3, "Objet requis"),
  message: z.string().min(20, "Message trop court (20 caractères minimum)"),
});

type FormData = z.infer<typeof schema>;

const inputClass =
  "w-full bg-surface-low border border-border text-foreground text-body-md px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder:text-muted-foreground/40";

const inputErrorClass =
  "w-full bg-surface-low border border-destructive/60 bg-destructive/5 text-foreground text-body-md px-4 py-3 focus:outline-none focus:border-destructive transition-colors placeholder:text-muted-foreground/40";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(_data: FormData) {
    // Simulated async submission (pas de backend réel — projet CV fictif)
    await new Promise((r) => setTimeout(r, 600));
    setSent(true);
    reset();
  }

  if (sent) {
    return (
      <div
        className="border-gold/30 border p-8"
        role="status"
        aria-live="polite"
      >
        <p className="text-body-lg text-gold mb-2">Message envoyé.</p>
        <p className="text-body-md text-muted-foreground">
          Notre équipe vous contactera sous 48h ouvrées.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6"
      aria-label="Formulaire de contact"
    >
      <div>
        <label
          htmlFor="contact-nom"
          className="text-label-caps text-muted-foreground mb-2 block"
        >
          Nom complet
        </label>
        <input
          id="contact-nom"
          {...register("nom")}
          type="text"
          placeholder="Jean Dupont"
          autoComplete="name"
          aria-invalid={!!errors.nom}
          aria-describedby={errors.nom ? "error-nom" : undefined}
          className={errors.nom ? inputErrorClass : inputClass}
        />
        {errors.nom && (
          <p
            id="error-nom"
            role="alert"
            className="text-label-caps text-destructive mt-1"
          >
            {errors.nom.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="text-label-caps text-muted-foreground mb-2 block"
        >
          Adresse e-mail
        </label>
        <input
          id="contact-email"
          {...register("email")}
          type="email"
          placeholder="jean@exemple.com"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "error-email" : undefined}
          className={errors.email ? inputErrorClass : inputClass}
        />
        {errors.email && (
          <p
            id="error-email"
            role="alert"
            className="text-label-caps text-destructive mt-1"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-objet"
          className="text-label-caps text-muted-foreground mb-2 block"
        >
          Objet
        </label>
        <input
          id="contact-objet"
          {...register("objet")}
          type="text"
          placeholder="Demande d'allocation / Partenariat"
          aria-invalid={!!errors.objet}
          aria-describedby={errors.objet ? "error-objet" : undefined}
          className={errors.objet ? inputErrorClass : inputClass}
        />
        {errors.objet && (
          <p
            id="error-objet"
            role="alert"
            className="text-label-caps text-destructive mt-1"
          >
            {errors.objet.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="text-label-caps text-muted-foreground mb-2 block"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          {...register("message")}
          rows={6}
          placeholder="Décrivez votre demande..."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "error-message" : undefined}
          className={`${errors.message ? inputErrorClass : inputClass} resize-none`}
        />
        {errors.message && (
          <p
            id="error-message"
            role="alert"
            className="text-label-caps text-destructive mt-1"
          >
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        aria-disabled={isSubmitting}
        className="text-label-caps text-background bg-gold px-10 py-4 transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isSubmitting ? "Envoi en cours…" : "Envoyer la communication"}
      </button>
    </form>
  );
}
