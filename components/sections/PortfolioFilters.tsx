"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterGroupProps {
  param: string;
  options: FilterOption[];
  current: string | null;
}

function FilterGroup({ param, options, current }: FilterGroupProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setFilter = useCallback(
    (value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null || value === current) {
        params.delete(param);
      } else {
        params.set(param, value);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams, param, current]
  );

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const isActive = current === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={[
              "text-label-caps border px-3 py-1.5 transition-colors duration-150",
              isActive
                ? "border-gold text-gold"
                : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
            ].join(" ")}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

interface Props {
  currentSector: string | null;
  currentStatus: string | null;
  currentVintage: string | null;
  totalResults: number;
  totalAll: number;
}

const SECTOR_OPTIONS: FilterOption[] = [
  { label: "Technology", value: "Technology" },
  { label: "Energy", value: "Energy" },
  { label: "Healthcare", value: "Healthcare" },
  { label: "Consumer", value: "Consumer" },
  { label: "FinTech", value: "Financial Technology" },
];

const STATUS_OPTIONS: FilterOption[] = [
  { label: "Actif", value: "active" },
  { label: "Sorti", value: "exited" },
];

const VINTAGE_OPTIONS: FilterOption[] = [
  { label: "2018", value: "2018" },
  { label: "2019", value: "2019" },
  { label: "2020", value: "2020" },
  { label: "2022", value: "2022" },
];

export function PortfolioFilters({
  currentSector,
  currentStatus,
  currentVintage,
  totalResults,
  totalAll,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const hasActiveFilter = currentSector || currentStatus || currentVintage;

  function clearAll() {
    router.push(pathname);
  }

  return (
    <div className="border-border border-b py-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-12">
        {/* Secteur */}
        <div className="flex flex-col gap-3">
          <span className="text-label-caps text-muted-foreground">SECTEUR</span>
          <FilterGroup
            param="secteur"
            options={SECTOR_OPTIONS}
            current={currentSector}
          />
        </div>

        {/* Statut */}
        <div className="flex flex-col gap-3">
          <span className="text-label-caps text-muted-foreground">STATUT</span>
          <FilterGroup
            param="statut"
            options={STATUS_OPTIONS}
            current={currentStatus}
          />
        </div>

        {/* Millésime */}
        <div className="flex flex-col gap-3">
          <span className="text-label-caps text-muted-foreground">
            MILLÉSIME
          </span>
          <FilterGroup
            param="vintage"
            options={VINTAGE_OPTIONS}
            current={currentVintage}
          />
        </div>

        {/* Reset + count */}
        <div className="flex items-end gap-4 lg:ml-auto">
          {hasActiveFilter && (
            <button
              onClick={clearAll}
              className="text-label-caps text-muted-foreground hover:text-foreground transition-colors"
            >
              Réinitialiser
            </button>
          )}
          <span className="text-label-caps text-muted-foreground">
            {totalResults === totalAll
              ? `${totalAll} participations`
              : `${totalResults} / ${totalAll}`}
          </span>
        </div>
      </div>
    </div>
  );
}
