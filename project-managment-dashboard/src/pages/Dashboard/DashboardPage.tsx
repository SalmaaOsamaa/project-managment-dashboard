import * as React from "react"

import { Table } from "../../components/ui/Table"
import { TableHeader } from "../../components/ui/TableHeader"
import { TableBody } from "../../components/ui/TableBody"
import { TableCell } from "../../components/ui/TableCell"
import { TableHead } from "../../components/ui/TableHead"
import { TableRow } from "../../components/ui/TableRow"
import Navbar from "../../components/Navbar"
import Header from "../../components/Header"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '../../components/ui/Dropdown'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '../../components/ui/Modal'
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table"

import { ArrowUpDown, ChevronDown, MoreHorizontal, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from '../../components/ui/button'
import Input from "../../components/ui/input"
import { useAllProducts } from "./useAllProducts"
import type { Product } from "../../domain-models"
import Skeleton from "../../components/ui/Skeleton"
import { useAllCategories } from "./useAllCategories"


interface EditProductFormData {
  title: string;
  price: string;
  description: string;
  category: string;
}
const DashboardPage = () => {
  const { productsList, isLoading, error, refetch, isSubmittingEditProduct, editProduct,successfullyEditedProduct, pageIndex, pageSize, setPagination } = useAllProducts();
  const { categoriesList, isLoading: isLoadingCategories, error: categoriesError, refetch: refetchCategories } = useAllCategories();

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(() => {
      try {
        const saved = localStorage.getItem('dashboard-column-visibility')
        return saved ? JSON.parse(saved) : {}
      } catch {
        return {}
      }
    })
  
  React.useEffect(() => {
    if (successfullyEditedProduct?.id) {
      refetch();
    }
  }, [successfullyEditedProduct, refetch]);
  
  React.useEffect(() => {
    try {
      localStorage.setItem('dashboard-column-visibility', JSON.stringify(columnVisibility))
    } catch (error) {
      console.error('Failed to save column visibility to localStorage:', error)
    }
  }, [columnVisibility])
  
  const [rowSelection, setRowSelection] = React.useState({})
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null)
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)
  const [formData, setFormData] = React.useState({
    title: "",
    price: "",
    description: "",
    category: "",
  })
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const imageUrl = row.getValue("image") as string
        return (
          <img
            src={imageUrl}
            alt="Product"
            className="h-12 w-12 object-contain rounded"
          />
        )
      },
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate" title={row.getValue("title")}>
          {row.getValue("title")}
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        const description = row.getValue("description") as string
        return (
          <div className="max-w-[300px] truncate" title={description}>
            {description}
          </div>
        )
      },
    },
    {
      accessorKey: "category",
      header: () => {
        return (
          <div>
            Category
          </div>
        )
      },
      cell: ({ row }) => {
        const category = row.getValue("category")
        const categoryStr = typeof category === "string" ? category : String(category)
        return <div className="capitalize">{categoryStr}</div>
      },
      filterFn: (row, columnId, filterValue: string | null) => {
        if (!filterValue) return true;
        const categoryValue = row.getValue(columnId);
        const categoryStr = typeof categoryValue === "string" ? categoryValue : String(categoryValue);
        return categoryStr === filterValue;
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <div className="text-right">
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Price
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )
      },
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price)
        return <div className="text-right font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => {
        const rating = row.original.rating
        return (
          <div className="text-sm">
            <div className="font-medium">{rating?.rate} ⭐</div>
            <div className="text-muted-foreground">({rating?.count} reviews)</div>
          </div>
        )
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  const product = row.original
                  setSelectedProduct(product)
                  setFormData({
                    title: product.title || "",
                    price: product.price?.toString() || "",
                    description: product.description || "",
                    category: typeof product.category === "string" ? product.category : String(product.category) || "",
                  })
                  setIsOpen(true)
                }}
              >
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
  const table = useReactTable({
    data: productsList || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: (updater) => {
      const newPagination = typeof updater === 'function' 
        ? updater({ pageIndex, pageSize })
        : updater;
      setPagination(newPagination.pageIndex, newPagination.pageSize);
    },
    manualPagination: false,
    enableFilters: true,
    autoResetPageIndex: true,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      }
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
  })
  
  const handleEditProduct = (formData: EditProductFormData) => {
    if (selectedProduct) {
      editProduct({
        product_id: selectedProduct.id.toString(),
        title: formData.title,
        price: parseFloat(formData.price),
        description: formData.description,
        category: formData.category,
      })
    }
  }
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Header 
        title="Products Management"
        description="Manage and view all your products"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Search by product title ..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        
        <div className="flex-1 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="flex items-center gap-2 min-w-max px-2">
            {isLoadingCategories ? (
              <span className="text-muted-foreground text-sm">Loading categories...</span>
            ) : categoriesError ? (
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">Failed to load categories</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => refetchCategories()}
                  className="h-6 px-2 text-xs"
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Retry
                </Button>
              </div>
            ) : categoriesList && categoriesList.length > 0 ? (
              categoriesList.map((category, index) => {
                const isSelected = selectedCategory === category;
                return (
                  <span
                    key={`${category}-${index}`}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-all capitalize
                      ${isSelected 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedCategory(null);
                        table.getColumn("category")?.setFilterValue(null);
                      } else {
                        setSelectedCategory(category);
                        table.getColumn("category")?.setFilterValue(category);
                      }
                    }}
                  >
                    <span>{category}</span>
                  </span>
                );
              })
            ) : (
              <span className="text-muted-foreground text-sm">No categories found</span>
            )}
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, rowIndex) => (
                <TableRow key={`skeleton-row-${rowIndex}`}>
                  {table.getHeaderGroups()[0]?.headers.map((header, colIndex) => (
                    <TableCell key={`skeleton-${rowIndex}-${colIndex}-${header.id}`}>
                      <Skeleton className="w-full h-12" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : error ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-64 text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-4 py-8">
                    <AlertCircle className="h-12 w-12 text-destructive" />
                    <div className="space-y-2">
                      <p className="text-lg font-semibold text-foreground">Failed to load products</p>
                      <p className="text-sm text-muted-foreground">
                        {error instanceof Error ? error.message : 'An error occurred while loading the data'}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => refetch()}
                      className="flex items-center gap-2"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Retry
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center py-4">
        <div className="text-muted-foreground px-2 text-sm">
          {pageSize * pageIndex + pageSize} of{" "}
          {productsList?.length} row(s) selected.
        </div>
        <div className="flex items-center gap-3 px-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      </div>
     {
      isOpen && (
        <Dialog 
          open={isOpen} 
          onOpenChange={(open) => {
            setIsOpen(open)
            if (!open) {
              setSelectedProduct(null)
              setFormData({
                title: "",
                price: "",
                description: "",
                category: "",
              })
            }
          }}
        > 
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Edit the product details</DialogDescription>
          </DialogHeader>
          
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleEditProduct(formData)
              setIsOpen(false)
            }}
          >
            <div className="grid gap-4 py-4 px-4">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter product title"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="price" className="text-sm font-medium">
                  Price
                </label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="Enter product price"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter product description"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Category
                </label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  placeholder="Enter product category"
                  required
                />
              </div>
            </div>

            <DialogFooter>
              <Button 
                type="button"
                variant="outline" 
                onClick={() => {
                  setIsOpen(false)
                  setSelectedProduct(null)
                  setFormData({
                    title: "",
                    price: "",
                    description: "",
                    category: "",
                  })
                }}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                variant="default" 
                disabled={isSubmittingEditProduct}
              >
                {isSubmittingEditProduct ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
        </Dialog>
      )
     }
    </div>
  )
}
export default DashboardPage