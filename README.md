# 🎮 Flyff Admin - Game Management Dashboard

A comprehensive web-based administration dashboard for managing Flyff (Fly For Fun) game data, built with Next.js 14, TypeScript, and Supabase.

## ✨ Features

### 🛡️ Items Management
- **Static Options System**: 100+ fields with predefined dropdown options
- **Dynamic CRUD Operations**: Create, Read, Update, Delete items
- **Advanced Filtering**: Search by name, filter by job, level, and more
- **URL-Synchronized Pagination**: Shareable links with filter state
- **Field Validation**: Comprehensive form validation with help tooltips

### ⚡ Skills Management
- **Static Options System**: 118+ fields with predefined dropdown options
- **Skills-Specific Architecture**: Separate `skills-<fieldname>.ts` files to avoid conflicts
- **Complete Field Coverage**: All database fields displayed in add/edit forms
- **Advanced Filtering**: Search by name, filter by job, level, and more
- **Dynamic Form Rendering**: Automatic dropdown/text input detection

### 🎮 Monster Management
- **Complete CRUD System**: Full Create, Read, Update, Delete operations
- **Advanced Form System**: Dynamic form rendering with multiple input types
- **Static Options System**: 50+ fields with predefined dropdown options
- **Special Input Fields**: Number fields, hybrid fields, and validation systems
- **Real-time Validation**: Regex-based input validation for complex fields
- **Wide Modal Interface**: 95% viewport width for better form visibility
- **7-Column Grid Layout**: Optimized for desktop admin use

### 🌐 Translations Management
- **16 Translation Types**: Character, Items, Skills, World, and more
- **Dynamic Routing**: URL-based navigation for different translation tables
- **Multi-language Support**: Based on configurable language constants
- **CRUD Operations**: Full create, read, update, delete functionality

### 🎨 User Interface
- **Modern Design**: Built with Shadcn/ui and Tailwind CSS
- **Responsive Layout**: Mobile-friendly interface
- **Dark/Light Mode**: Theme toggle support
- **Collapsible Sidebar**: Expandable navigation with icons
- **Breadcrumb Navigation**: Clear navigation hierarchy

## 🏗️ Architecture

### Project Structure
```
src/
├── app/dashboard/           # Next.js App Router pages
│   ├── items/              # Items management
│   ├── skills/             # Skills management
│   └── translations/[type] # Dynamic translation routes
├── components/             # React components
│   ├── ui/                # Shadcn/ui components
│   ├── item-*.tsx         # Items management components
│   ├── skill-*.tsx        # Skills management components
│   └── translation-*.tsx  # Translation components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and configurations
├── types/                 # TypeScript type definitions
│   └── database/          # Database types and static options
└── middleware.ts          # Next.js middleware
```

### Key Components

#### 🛡️ Items Management
- `ItemTable`: Main table component with filtering and pagination
- `ItemAddModal`: Add new items with dynamic form fields
- `ItemEditModal`: Edit existing items with validation
- `ItemSearchFilters`: Search and filter interface
- `ItemTableContent`: Table content with sorting and actions

#### ⚡ Skills Management
- `SkillTable`: Main table component with filtering and pagination
- `SkillAddModal`: Add new skills with dynamic form fields
- `SkillEditModal`: Edit existing skills with validation
- `SkillSearchFilters`: Search and filter interface
- `SkillTableContent`: Table content with sorting and actions

#### 🎮 Monster Management
- `MonsterTable`: Main table component with filtering and pagination
- `MonsterAddModal`: Add new monsters with dynamic form fields and special input types
- `MonsterEditModal`: Edit existing monsters with validation
- `MonsterSearchFilters`: Search and filter interface
- `MonsterTableContent`: Table content with sorting and actions

#### 🌐 Translations Management
- `TranslationTable`: Main table component for all translation types
- `TranslationAddModal`: Add new translations
- `TranslationEditModal`: Edit existing translations

### Custom Hooks

#### Data Management
- `useItemData`: Items CRUD operations and data fetching
- `useSkillData`: Skills CRUD operations and data fetching
- `useMonsterData`: Monsters CRUD operations and data fetching
- `useItemOptions`: Items static options management
- `useSkillOptions`: Skills static options management
- `useMonsterOptions`: Monsters static options management

#### State Management
- `useItemFilters`: Items filter state and URL synchronization
- `useSkillFilters`: Skills filter state and URL synchronization
- `useMonsterFilters`: Monsters filter state and URL synchronization

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flyff-admin
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Database Setup**
   - Set up your Supabase project
   - Create the required tables: `propitem`, `propskill`, `proptranslation`
   - Import your game data into the tables

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

### Tables

#### `propitem` - Items Table
Contains all game items including weapons, armor, consumables, etc.

#### `propskill` - Skills Table
Contains all player skills, abilities, and spells.

#### `propmover` - Monsters Table
Contains all game monsters, NPCs, and creatures with their properties and behaviors.

#### `proptranslation` - Translations Table
Contains text translations for various game elements.

### Static Options System

The project uses a sophisticated static options system to replace dynamic database queries with predefined dropdown options:

#### Items Static Options
- **Location**: `src/types/database/`
- **Files**: `dwitemjob.ts`, `dwitemkind1.ts`, etc.
- **Exports**: `DWITEMJOB_OPTIONS`, `DWITEMKIND1_OPTIONS`, etc.

#### Skills Static Options
- **Location**: `src/types/database/`
- **Files**: `skills-dwitemjob.ts`, `skills-dwitemkind1.ts`, etc.
- **Exports**: `SKILLS_DWITEMJOB_OPTIONS`, `SKILLS_DWITEMKIND1_OPTIONS`, etc.
- **Pattern**: `skills-<fieldname>.ts` to avoid conflicts with item options

#### Central Exports
All static options are exported from `src/types/database/index.ts` for easy importing.

## 🛠️ Development

### Adding New Static Options

1. **Create the options file**
   ```typescript
   // src/types/database/skills-newfield.ts
   export const SKILLS_NEWFIELD_OPTIONS = [
     "option1",
     "option2",
     "option3"
   ];
   ```

2. **Add to central exports**
   ```typescript
   // src/types/database/index.ts
   export { SKILLS_NEWFIELD_OPTIONS } from '@/types/database/skills-newfield';
   ```

3. **Update form utilities** (if needed)
   ```typescript
   // src/utils/skill-form-utils.ts
   export const SELECT_FIELDS = [
     // ... existing fields
     'newfield'
   ];
   ```

## 🎯 Tutorial: Creating Special Input Fields for CRUD Systems

This tutorial shows how to implement advanced input field types for your CRUD systems, based on the Monster Management implementation.

### Overview of Special Field Types

The system supports three main types of special input fields:

1. **Number Fields**: Integer and float inputs with validation
2. **Hybrid Fields**: Fields that accept numbers OR special strings
3. **Select Fields**: Dropdown fields with static options

### Step 1: Define Field Types in Form Utilities

Create or update your form utilities file (e.g., `src/utils/your-entity-form-utils.ts`):

```typescript
import type { TYourEntity } from "@/types/database";

// Define which fields should be rendered as each type
export const NUMBER_FIELDS: Array<keyof TYourEntity> = [
  'field1', // Integer field
  'field2', // Float field
];

export const HYBRID_FIELDS: Array<keyof TYourEntity> = [
  'field3', // Number or special string
  'field4', // Number or multiple special strings
];

export const SELECT_FIELDS: Array<keyof TYourEntity> = [
  'field5', // Dropdown field
  'field6', // Another dropdown field
];

export const HIDDEN_FIELDS: Array<keyof TYourEntity> = [
  'internal_id', // Fields to hide from forms
];

// Helper functions
export function isNumberField(field: keyof TYourEntity): boolean {
  return NUMBER_FIELDS.includes(field);
}

export function isHybridField(field: keyof TYourEntity): boolean {
  return HYBRID_FIELDS.includes(field);
}

export function isSelectField(field: keyof TYourEntity): boolean {
  return SELECT_FIELDS.includes(field);
}

export function isHiddenField(field: keyof TYourEntity): boolean {
  return HIDDEN_FIELDS.includes(field);
}
```

### Step 2: Define Field Constraints

Add constraint definitions for number and hybrid fields:

```typescript
// Number field constraints
export function getNumberFieldConstraints(field: keyof TYourEntity): { 
  min: number; max: number; step: number; 
} | null {
  const constraints = {
    field1: { min: 1, max: 5000, step: 1 }, // Integer
    field2: { min: 0, max: 1000000, step: 0.01 }, // Float
  };
  return constraints[field as keyof typeof constraints] || null;
}

// Hybrid field constraints
export function getHybridFieldConstraints(field: keyof TYourEntity): {
  min: number; max: number; step: number; 
  stringOptions: string[]; 
  regex: RegExp; 
  placeholder: string;
} | null {
  const constraints = {
    field3: { 
      min: 0, max: 4000, step: 1, 
      stringOptions: ["="], 
      regex: /^(=|[0-9]{1,4})$/, 
      placeholder: "Enter number (0-4000) or =" 
    },
    field4: { 
      min: 0, max: 1000000, step: 1, 
      stringOptions: ["=", "FALSE"], 
      regex: /^(=|FALSE|[0-9]{1,7})$/, 
      placeholder: "Enter number (0-1000000), =, or FALSE" 
    },
  };
  return constraints[field as keyof typeof constraints] || null;
}

// Validation function for hybrid fields
export function validateHybridFieldValue(field: keyof TYourEntity, value: string): boolean {
  const constraints = getHybridFieldConstraints(field);
  if (!constraints) return true;
  
  // Check if it's a valid string option
  if (constraints.stringOptions.includes(value)) return true;
  
  // Check if it's a valid number within range
  const num = parseFloat(value);
  if (isNaN(num)) return false;
  
  return num >= constraints.min && num <= constraints.max;
}
```

### Step 3: Create Static Options for Select Fields

For each select field, create a static options file:

```typescript
// src/types/database/your-entity-field5.ts
export const YOUR_ENTITY_FIELD5_OPTIONS = [
  "option1",
  "option2", 
  "option3",
  // ... more options
];

// src/types/database/your-entity-field6.ts
export const YOUR_ENTITY_FIELD6_OPTIONS = [
  "value1",
  "value2",
  "value3",
  // ... more options
];
```

Add exports to the central index file:

```typescript
// src/types/database/index.ts
export { YOUR_ENTITY_FIELD5_OPTIONS } from './your-entity-field5';
export { YOUR_ENTITY_FIELD6_OPTIONS } from './your-entity-field6';
```

### Step 4: Implement Dynamic Form Rendering

In your add/edit modal components, implement the dynamic form rendering:

```typescript
import { 
  isSelectField, 
  isHiddenField, 
  isNumberField, 
  getNumberFieldConstraints, 
  isHybridField, 
  getHybridFieldConstraints, 
  validateHybridFieldValue 
} from "@/utils/your-entity-form-utils";

// In your form rendering logic:
{entityFields.map((field) => {
  if (isHiddenField(field)) return null;
  
  const key = String(field);
  const options = selectOptionsByField[key] || [];
  const placeholder = selectPlaceholdersByField[key] || `Enter ${key}`;

  return (
    <div key={key} className="space-y-2">
      <FieldHelpTooltip
        label={<Label htmlFor={key}>{key}</Label>}
        help={getEntityFieldDescription(key)}
      />
      
      {isSelectField(field) && options.length > 0 ? (
        <SearchableCombobox
          options={options}
          value={formData[field] || ""}
          onValueChange={(value: string) => handleInputChange(field, value)}
          placeholder={placeholder}
          searchPlaceholder={`Search ${key}...`}
          emptyMessage={`No ${key} options found.`}
        />
      ) : isNumberField(field) ? (
        <Input
          id={key}
          type="number"
          min={getNumberFieldConstraints(field)?.min}
          max={getNumberFieldConstraints(field)?.max}
          step={getNumberFieldConstraints(field)?.step}
          value={formData[field] || ""}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholder}
        />
      ) : isHybridField(field) ? (
        <Input
          id={key}
          type="text"
          value={formData[field] || ""}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "" || validateHybridFieldValue(field, value)) {
              handleInputChange(field, value);
            }
          }}
          placeholder={getHybridFieldConstraints(field)?.placeholder || "Enter value"}
          className="font-mono"
        />
      ) : (
        <Input
          id={key}
          value={formData[field] || ""}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
})}
```

### Step 5: Add Field Descriptions

Create field descriptions for tooltips:

```typescript
// src/lib/your-entity-field-descriptions.ts
export const ENTITY_FIELD_DESCRIPTIONS: Record<string, string> = {
  field1: "Integer field with range 1-5000.",
  field2: "Float field with range 0-1000000 (step 0.01).",
  field3: "Hybrid field: number (0-4000) or = for default.",
  field4: "Hybrid field: number (0-1000000), =, or FALSE.",
  field5: "Dropdown field with predefined options.",
  field6: "Another dropdown field with predefined options.",
};

export function getEntityFieldDescription(field: string): string {
  return ENTITY_FIELD_DESCRIPTIONS[field] || `Field: ${field}`;
}
```

### Step 6: Update Your Hooks

Update your options hook to handle the new field types:

```typescript
// src/hooks/use-your-entity-options.ts
import * as EntityOptions from '@/types/database';

export function useEntityOptions() {
  const selectOptionsByField: Record<string, string[]> = {};
  const selectPlaceholdersByField: Record<string, string> = {};

  // Get only YOUR_ENTITY_ prefixed options
  const allOptions = Object.entries(EntityOptions)
    .filter(([key]) => key.startsWith('YOUR_ENTITY_') && key.endsWith('_OPTIONS'))
    .forEach(([key, options]) => {
      const fieldName = key.replace('YOUR_ENTITY_', '').replace('_OPTIONS', '').toLowerCase();
      selectOptionsByField[fieldName] = options as string[];
      selectPlaceholdersByField[fieldName] = `Select ${fieldName}`;
    });

  return { selectOptionsByField, selectPlaceholdersByField };
}
```

### Usage Examples

#### Number Field Example
```typescript
// Integer field (1-5000)
field1: { min: 1, max: 5000, step: 1 }

// Float field (0-1000000 with 0.01 step)
field2: { min: 0, max: 1000000, step: 0.01 }
```

#### Hybrid Field Examples
```typescript
// Number or single special string
field3: { 
  min: 0, max: 4000, step: 1, 
  stringOptions: ["="], 
  regex: /^(=|[0-9]{1,4})$/, 
  placeholder: "Enter number (0-4000) or =" 
}

// Number or multiple special strings
field4: { 
  min: 0, max: 1000000, step: 1, 
  stringOptions: ["=", "FALSE"], 
  regex: /^(=|FALSE|[0-9]{1,7})$/, 
  placeholder: "Enter number (0-1000000), =, or FALSE" 
}
```

### Benefits of This System

1. **Type Safety**: Full TypeScript support with proper type checking
2. **Validation**: Real-time client-side validation prevents invalid data
3. **User Experience**: Clear placeholders and helpful tooltips
4. **Maintainability**: Centralized configuration makes updates easy
5. **Flexibility**: Easy to add new field types and constraints
6. **Performance**: Static options eliminate database queries for dropdowns

### Custom Hooks Pattern

The project uses custom hooks for clean state management:

```typescript
// Example: useItemData hook
export function useItemData(tableName: string, searchTerm: string, page: number, jobFilter: string, levelFilter: string) {
  // State management
  // Data fetching
  // CRUD operations
  return {
    records,
    loading,
    totalPages,
    fetchRecords,
    deleteRecord
  };
}
```

### Component Architecture

Components follow a consistent pattern:

```typescript
// Main table component
export function ItemTable({ tableName, title, description }) {
  // Custom hooks for state management
  const { options, placeholders } = useItemOptions();
  const { searchTerm, setSearchTerm, ... } = useItemFilters();
  const { records, loading, ... } = useItemData(...);

  // Event handlers
  const handleEdit = (record) => { ... };
  const handleDelete = (id) => { ... };

  return (
    <div>
      {/* Header */}
      {/* Search & Filters */}
      {/* Table Content */}
      {/* Modals */}
    </div>
  );
}
```

## 🎯 Usage Guide

### Managing Items

1. **Navigate to Items**
   - Click "Items" in the sidebar
   - Or go to `/dashboard/items`

2. **Search and Filter**
   - Use the search bar to find items by name
   - Use job and level filters to narrow results
   - Pagination controls at the bottom

3. **Add New Item**
   - Click "Add New Item" button
   - Fill in the required fields
   - Use dropdowns for fields with static options
   - Click "Save" to create the item

4. **Edit Item**
   - Click the edit icon on any item row
   - Modify the fields as needed
   - Click "Save" to update the item

5. **Delete Item**
   - Click the delete icon on any item row
   - Confirm the deletion

### Managing Skills

1. **Navigate to Skills**
   - Click "Skills" in the sidebar
   - Or go to `/dashboard/skills`

2. **Search and Filter**
   - Use the search bar to find skills by name
   - Use job and level filters to narrow results
   - Pagination controls at the bottom

3. **Add New Skill**
   - Click "Add Skill" button
   - Fill in the required fields
   - Use dropdowns for fields with static options
   - Click "Save" to create the skill

4. **Edit Skill**
   - Click the edit icon on any skill row
   - Modify the fields as needed
   - Click "Save" to update the skill

5. **Delete Skill**
   - Click the delete icon on any skill row
   - Confirm the deletion

### Managing Monsters

1. **Navigate to Monsters**
   - Click "Monsters" in the sidebar
   - Or go to `/dashboard/monsters`

2. **Search and Filter**
   - Use the search bar to find monsters by name
   - Use level and race filters to narrow results
   - Pagination controls at the bottom

3. **Add New Monster**
   - Click "Add Monster" button
   - Fill in the required fields
   - Use dropdowns for fields with static options
   - Use number inputs for integer/float fields
   - Use hybrid inputs for fields that accept numbers or special strings
   - Click "Save" to create the monster

4. **Edit Monster**
   - Click the edit icon on any monster row
   - Modify the fields as needed
   - Click "Save" to update the monster

5. **Delete Monster**
   - Click the delete icon on any monster row
   - Confirm the deletion

### Managing Translations

1. **Navigate to Translations**
   - Click "Translations" in the sidebar
   - Select the specific translation type
   - Or go to `/dashboard/translations/[type]`

2. **Available Translation Types**
   - Character translations
   - Item translations
   - Skill translations
   - World translations
   - And 12 more types...

3. **Add/Edit Translations**
   - Use the same CRUD operations as items and skills
   - Translations support multiple languages

## 🔧 Configuration

### Translation Types

Edit `src/lib/translation-config.ts` to add new translation types:

```typescript
export const TRANSLATION_CONFIG = {
  'new-type': {
    tableName: 'new_translation_table',
    title: 'New Translations',
    description: 'Manage new translations'
  },
  // ... existing types
};
```

### Field Descriptions

Add field help text in:
- `src/lib/item-field-descriptions.ts` for items
- `src/lib/skill-field-descriptions.ts` for skills

### Static Options

Add new static options following the established pattern:
- Items: `src/types/database/fieldname.ts`
- Skills: `src/types/database/skills-fieldname.ts`

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Add tests** (if applicable)
5. **Submit a pull request**

### Development Guidelines

- Follow TypeScript best practices
- Use custom hooks for state management
- Maintain the established component patterns
- Add proper documentation for new features
- Test thoroughly before submitting

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

## 🔄 Changelog

### Version 1.0.0
- Initial release with Items, Skills, and Translations management
- Static options system for improved performance
- Responsive design with dark/light mode
- URL-synchronized state management
- Comprehensive CRUD operations

---

**Built with ❤️ for the Flyff community**
