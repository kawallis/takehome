## Getting Started

First, install:

```bash
npm i
# or
yarn
```

Than, run the development server:

```bash
npm run dev
# or
yarn dev
```

# Architecture

This project is a Next.js application that uses the Table component to display a list of plasmids.

# Table Component Architecture

The table component architecture follows a composable, hierarchical pattern with clear separation of concerns.

## Component Hierarchy

The table architecture is built as a tree of specialized components:

### TableContainer

The top-level component that:

- Manages data fetching and state via `usePlasmids` hook
- Handles data updates and change propagation
- Defines column configurations with types, widths, and edit behaviors
- Provides pagination controls
- Shows loading states via TableSkeleton when needed

### Table

The core table component that:

- Accepts columns, data, and onChange handler as props
- Provides the basic table structure and styling
- Delegates to TableHeader and TableBody for rendering content

### TableHeader

Renders the table header row:

- Maps through column definitions to create header cells
- Applies styling and width configurations

### TableBody

Renders the table data rows:

- Maps through data to create TableRow components
- Passes column definitions and change handlers down

### TableRow

Renders a single row of data:

- Maps through columns to create TableCell components for each cell
- Passes row data and change handlers down

### TableCell

The most complex component that:

- Manages cell editing state (editing/not editing)
- Renders different UI based on column type (text, number, link, tag)
- Handles user interactions for editing
- Provides a registry of cell renderers for different data types
- Supports custom cell renderers via column.cell property

## Data Flow

- Data flows down from TableContainer through props
- Changes flow up through callback functions (onChange handlers)
- Each component is responsible for a specific part of the table rendering
- Type safety is maintained through TypeScript generics

## Type System Supporting Predefined and Custom Cell Components

The table component's flexibility to support both predefined and custom cell components is elegantly enabled through its type system. Here's how the two key types work together:

### `AnyColumnDef<T>` - Column Structure Definition

## This Type

### Maps data properties to column definitions

It creates a union type of all possible `ColumnDef<T, K>` where `K` is any key of `T`.

### Ensures type safety

The column definition is tied directly to the data structure, so TypeScript can verify that:

- Column IDs match actual properties in your data
- Value accessors return the correct type
- Cell renderers receive properly typed values

### Supports column configuration

Each column can specify:

- A predefined type (`text`, `number`, `link`, `tag`)
- A custom cell renderer function
- Other metadata like width and editable status

---

## `CellContext<T, K>` - Cell Rendering Context

`CellContext<T, K>` provides all the information and functionality a cell renderer needs:

```typescript
export interface CellContext<T, K extends keyof T> {
  value: T[K];
  row: T;
  rowIndex: number;
  editing: boolean;
  onChange: (value: T[K]) => void;
}
```

### Provides Complete Rendering Information

The cell renderer has access to:

- The specific cell value with proper typing (`value: T[K]`)
- The entire row data for context (`row: T`)
- Position information (`rowIndex`)
- Current editing state (`editing`)

### Enables Controlled Editing

The `onChange` function allows the cell to update its value while maintaining type safety.

---

### How They Work Together

The magic happens in the `TableCell` component, which uses these types to support both predefined and custom cell renderers.

## For custom cell renderers

When defining columns, you can either:

Use a predefined cell type by setting the type property to one of the registered types:

```typescript
{
  id: "volume",
  header: "Volume (µl)",
  type: "number",
  getValue: (row) => row.volume,
  editable: true,
  width: 120,
}
```

Provide a custom cell renderer through the cell property:

```typescript
{
  id: "editedBy",
  header: "Edited by",
  getValue: (row) => row.editedBy,
  editable: true,
  width: 200,
  cell: (ctx: CellContext<PlasmidRow, "editedBy">) => (
    <UserListCellContainer value={ctx.value} onChange={ctx.onChange} />
  ),
}
```

This approach gives you the flexibility to use simple predefined cell types for common data while creating custom cell components for complex data types or specialized UI needs - all while maintaining full type safety throughout the component hierarchy.
