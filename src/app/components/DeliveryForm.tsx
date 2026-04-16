import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Phone, User } from "lucide-react";
import type { CustomerInfo } from "../lib/supabase";

const STORAGE_KEY = "mypizza_delivery_info";

interface DeliveryFormProps {
  onValid: (info: CustomerInfo) => void;
}

type FormValues = {
  name: string;
  phone: string;
  street: string;
  plz: string;
  city: string;
};

function loadSaved(): Partial<FormValues> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function DeliveryForm({ onValid }: DeliveryFormProps) {
  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: loadSaved(),
  });

  const values = watch();

  // Persist every keystroke to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    } catch {
      // ignore private-mode quota errors
    }

    if (isValid) {
      onValid({
        name: values.name.trim(),
        phone: values.phone.trim(),
        address: {
          street: values.street.trim(),
          plz: values.plz.trim(),
          city: values.city.trim(),
        },
      });
    }
  }, [values, isValid, onValid]);

  const fieldClass = (hasError: boolean) =>
    `w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
      hasError
        ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
        : "border-gray-200 bg-gray-50 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
    }`;

  return (
    <div className="space-y-3">
      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
        Lieferadresse
      </p>

      {/* Name */}
      <div>
        <div className="relative">
          <User
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            {...register("name", {
              required: "Name erforderlich",
              minLength: { value: 2, message: "Mindestens 2 Zeichen" },
            })}
            placeholder="Vor- und Nachname"
            className={`${fieldClass(!!errors.name)} pl-8`}
          />
        </div>
        {errors.name && (
          <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <div className="relative">
          <Phone
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            {...register("phone", {
              required: "Telefonnummer erforderlich",
              pattern: {
                value: /^[+\d\s\-()]{6,20}$/,
                message: "Ungültige Telefonnummer",
              },
            })}
            placeholder="Telefonnummer"
            type="tel"
            className={`${fieldClass(!!errors.phone)} pl-8`}
          />
        </div>
        {errors.phone && (
          <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Street */}
      <div>
        <div className="relative">
          <MapPin
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            {...register("street", {
              required: "Straße erforderlich",
              minLength: { value: 4, message: "Vollständige Straße eingeben" },
            })}
            placeholder="Straße und Hausnummer"
            className={`${fieldClass(!!errors.street)} pl-8`}
          />
        </div>
        {errors.street && (
          <p className="text-xs text-red-500 mt-1">{errors.street.message}</p>
        )}
      </div>

      {/* PLZ + City */}
      <div className="flex gap-2">
        <div className="w-28 shrink-0">
          <input
            {...register("plz", {
              required: "PLZ erforderlich",
              pattern: {
                value: /^\d{4,6}$/,
                message: "Ungültige PLZ",
              },
            })}
            placeholder="PLZ"
            className={fieldClass(!!errors.plz)}
          />
          {errors.plz && (
            <p className="text-xs text-red-500 mt-1">{errors.plz.message}</p>
          )}
        </div>
        <div className="flex-1">
          <input
            {...register("city", {
              required: "Stadt erforderlich",
              minLength: { value: 2, message: "Stadt eingeben" },
            })}
            placeholder="Stadt"
            className={fieldClass(!!errors.city)}
          />
          {errors.city && (
            <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>
          )}
        </div>
      </div>

      {/* Validity indicator */}
      {isValid && (
        <div className="flex items-center gap-1.5 text-green-600 text-xs font-medium">
          <span className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            ✓
          </span>
          Adresse bestätigt — bitte jetzt bezahlen
        </div>
      )}
    </div>
  );
}
