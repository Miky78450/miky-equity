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

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  function onSubmit(data: FormData) {
    console.log("Form data:", data);
    setSent(true);
    reset();
  }

  if (sent) {
    return (
      <div className="border-gold/30 border p-8">
        <p className="text-body-lg text-gold mb-2">Message envoyé.</p>
        <p className="text-body-md text-muted-foreground">
          Notre équipe vous contactera sous 48h ouvrées.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div>
        <label className="text-label-caps text-muted-foreground mb-2 block">
          Nom complet
        </label>
        <input
          {...register("nom")}
          type="text"
          placeholder="Jean Dupont"
          className={inputClass}
        />
        {errors.nom && (
          <p className="text-label-caps text-destructive mt-1">
            {errors.nom.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-label-caps text-muted-foreground mb-2 block">
          Adresse e-mail
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="jean@exemple.com"
          className={inputClass}
        />
        {errors.email && (
          <p className="text-label-caps text-destructive mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-label-caps text-muted-foreground mb-2 block">
          Objet
        </label>
        <input
          {...register("objet")}
          type="text"
          placeholder="Demande d'allocation / Partenariat"
          className={inputClass}
        />
        {errors.objet && (
          <p className="text-label-caps text-destructive mt-1">
            {errors.objet.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-label-caps text-muted-foreground mb-2 block">
          Message
        </label>
        <textarea
          {...register("message")}
          rows={6}
          placeholder="Décrivez votre demande..."
          className={`${inputClass} resize-none`}
        />
        {errors.message && (
          <p className="text-label-caps text-destructive mt-1">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="text-label-caps text-background bg-gold px-10 py-4 transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isSubmitting ? "Envoi..." : "Envoyer la communication"}
      </button>
    </form>
  );
}
