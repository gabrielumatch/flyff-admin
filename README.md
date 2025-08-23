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

#### 🌐 Translations Management
- `TranslationTable`: Main table component for all translation types
- `TranslationAddModal`: Add new translations
- `TranslationEditModal`: Edit existing translations

### Custom Hooks

#### Data Management
- `useItemData`: Items CRUD operations and data fetching
- `useSkillData`: Skills CRUD operations and data fetching
- `useItemOptions`: Items static options management
- `useSkillOptions`: Skills static options management

#### State Management
- `useItemFilters`: Items filter state and URL synchronization
- `useSkillFilters`: Skills filter state and URL synchronization

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
