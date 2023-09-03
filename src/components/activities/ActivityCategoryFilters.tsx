import { BoredAPIActivityType } from "../../types/default-activities";

interface Category {
  key: BoredAPIActivityType;
  label: string;
  icon: string;
}

interface CategoryFiltersProps {
  handleCategoryFilter: (category: BoredAPIActivityType) => void;
  selectedCategory: string;
}

const categoryData: Category[] = [
  { key: "all", label: "All", icon: "icon-all" },
  { key: "education", label: "Education", icon: "icon-education" },
  { key: "recreational", label: "Recreational", icon: "icon-recreational" },
  { key: "social", label: "Social", icon: "icon-social" },
  { key: "diy", label: "DIY", icon: "icon-diy" },
  { key: "charity", label: "Charity", icon: "icon-charity" },
  { key: "cooking", label: "Cooking", icon: "icon-cooking" },
  { key: "relaxation", label: "Relaxation", icon: "icon-relaxation" },
  { key: "music", label: "Music", icon: "icon-music" },
  { key: "busywork", label: "Busywork", icon: "icon-busywork" },
];

export default function CategoryFilters({
  handleCategoryFilter,
  selectedCategory,
}: CategoryFiltersProps) {
  return (
    <ul className="flex flex-wrap my-2 gap-2">
      {categoryData.map(({ key, label }) => (
        <button
          key={key}
          className={`${
            selectedCategory === key ? 'bg-accent/10' : '' // Add background to selected category
          } text-accent/80 flex items-center gap-2 hover:bg-accent/10 p-2 rounded-xl duration-200`}
          onClick={() => handleCategoryFilter(key)}
        >
          {label}
        </button>
      ))}
    </ul>
  );
}
