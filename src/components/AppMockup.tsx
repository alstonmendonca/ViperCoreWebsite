'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Receipt,
  UtensilsCrossed,
  Tags,
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  Table,
} from 'lucide-react'

/* -- Theme tokens (matching real app CSS variables) ----------- */

const T = {
  bgApp: '#EEE5DA',
  bgSidebar: '#262424',
  bgCard: '#EEE5DA',
  bgInput: '#EEE5DA',
  bgHover: 'rgba(38,36,36,0.06)',
  bgActive: 'rgba(38,36,36,0.12)',
  textOnDark: '#EEE5DA',
  textOnLight: '#262424',
  textMuted: '#6B6B6B',
  borderOnDark: 'rgba(238,229,218,0.28)',
  borderOnLight: '#262424',
  borderSubtle: 'rgba(38,36,36,0.14)',
  btnPrimaryBg: '#262424',
  btnPrimaryText: '#EEE5DA',
  btnSecondaryBg: '#EEE5DA',
  btnSecondaryText: '#262424',
  btnSecondaryBorder: '#262424',
  green: '#16a34a',
  greenDim: 'rgba(34,197,94,0.16)',
  red: '#dc2626',
  redDim: 'rgba(239,68,68,0.16)',
  accent: '#d4952a',
}

/* -- Sidebar (matches real DashboardPage) --------------------- */

const navSections = [
  { key: 'billing', label: 'Billing', Icon: Receipt },
  { key: 'menu', label: 'Menu', Icon: UtensilsCrossed },
  { key: 'categories', label: 'Categories', Icon: Tags },
  {
    key: 'history',
    label: 'History',
    Icon: BookOpen,
    subViews: [
      { key: 'todaysOrders', label: "Today's Orders" },
      { key: 'orderHistory', label: 'Order History' },
      { key: 'discountedOrders', label: 'Discounted Orders' },
      { key: 'deletedOrders', label: 'Deleted Orders' },
      { key: 'searchOrder', label: 'Search Order' },
    ],
  },
  {
    key: 'reports',
    label: 'Reports',
    Icon: BarChart3,
    subViews: [
      { key: 'dayEndSummary', label: 'Day End Summary' },
      { key: 'salesOverview', label: 'Sales Overview' },
      { key: 'categorySales', label: 'Category Sales' },
      { key: 'discountedOrders', label: 'Discounted Orders' },
      { key: 'topSellingItems', label: 'Top Items' },
      { key: 'topSellingCategory', label: 'Top Categories' },
      { key: 'itemSummary', label: 'Item Summary' },
      { key: 'employeeAnalysis', label: 'Employee Analysis' },
      { key: 'bestInCategory', label: 'Best In Category' },
      { key: 'taxOnItems', label: 'Tax On Items' },
    ],
  },
  {
    key: 'settings',
    label: 'Settings',
    Icon: Settings,
    subViews: [
      { key: 'profile', label: 'Profile & Password' },
      { key: 'featureToggles', label: 'Feature Toggles' },
      { key: 'taxSettings', label: 'Tax Settings' },
      { key: 'updates', label: 'Updates' },
      { key: 'theme', label: 'Theme' },
      { key: 'printerConfig', label: 'Printer Config' },
      { key: 'businessInfo', label: 'Business Info' },
      { key: 'receiptEditor', label: 'Receipt Editor' },
      { key: 'backup', label: 'Backup Database' },
      { key: 'restore', label: 'Restore Database' },
      { key: 'exitApp', label: 'Exit App' },
    ],
  },
]

function MockSidebar({
  activeItem,
  expandedItem,
}: {
  activeItem: string
  expandedItem: string
}) {
  return (
    <div
      className="flex flex-col shrink-0 h-full overflow-hidden"
      style={{
        width: 288,
        background: T.bgSidebar,
        borderRight: `1px solid ${T.borderOnDark}`,
      }}
    >
      {/* Brand section - matches real app */}
      <div
        className="px-6 py-6 flex items-center gap-3"
        style={{ borderBottom: `1px solid ${T.borderOnDark}` }}
      >
        <img
          src="/favicon.ico"
          alt="ViperCore"
          className="w-10 h-10 rounded-sm object-contain"
        />
        <div>
          <p
            className="text-lg font-bold tracking-[0.15em]"
            style={{ color: T.textOnDark }}
          >
            ViperCore
          </p>
          <p
            className="text-sm mt-0.5"
            style={{ color: T.textOnDark, opacity: 0.4 }}
          >
            admin
          </p>
        </div>
      </div>

      {/* Nav items - matches real sidebar nav */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-0.5">
        {navSections.map(({ key, label, Icon, subViews }) => {
          const isActive = activeItem === key
          const hasSub = subViews && subViews.length > 0
          const isExpanded = expandedItem === key

          return (
            <div key={key}>
              <div
                className="flex items-center gap-3 rounded-lg mx-2 transition-all"
                style={{
                  backgroundColor: isActive ? T.bgHover : 'transparent',
                  color: T.textOnDark,
                  opacity: isActive ? 1 : 0.6,
                  fontWeight: isActive ? 600 : 400,
                  width: 'calc(100% - 16px)',
                  padding: '12px 20px',
                  border: isActive
                    ? `1px solid ${T.borderOnDark}`
                    : '1px solid transparent',
                }}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className="flex-1 text-sm">{label}</span>
                {hasSub && (
                  isExpanded
                    ? <ChevronDown size={14} style={{ opacity: 0.5 }} />
                    : <ChevronRight size={14} style={{ opacity: 0.5 }} />
                )}
              </div>

              {isExpanded && hasSub && (
                <div className="px-4 mt-0.5 mb-1">
                  {subViews!.map((sub) => (
                    <div
                      key={sub.key}
                      className="block w-full text-left px-4 py-2 text-xs rounded-md transition-all"
                      style={{
                        backgroundColor: 'transparent',
                        color: T.textOnDark,
                        opacity: 0.45,
                        fontWeight: 400,
                        borderLeft: '2px solid transparent',
                      }}
                    >
                      {sub.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Sign out - matches real app */}
      <div
        className="px-4 py-4"
        style={{ borderTop: `1px solid ${T.borderOnDark}` }}
      >
        <div
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm"
          style={{ color: T.textOnDark, opacity: 0.72 }}
        >
          <LogOut size={16} />
          Sign out
        </div>
      </div>
    </div>
  )
}

/* -- Frame (matches real DashboardPage layout) ---------------- */

function MockFrame({
  activeItem,
  expandedItem,
  title,
  children,
  interactive = false,
  height = 480,
}: {
  activeItem: string
  expandedItem?: string
  title: string
  children: React.ReactNode
  interactive?: boolean
  height?: number
}) {
  return (
    <div
      className="flex w-full rounded-lg overflow-hidden"
      style={{
        height,
        boxShadow: '0 12px 60px rgba(0,0,0,0.18)',
        border: `1px solid ${T.borderSubtle}`,
        pointerEvents: interactive ? 'auto' : 'none',
        background: T.bgApp,
      }}
    >
      <MockSidebar
        activeItem={activeItem}
        expandedItem={expandedItem ?? activeItem}
      />
      <div
        className="flex-1 flex flex-col min-w-0"
        style={{ background: T.bgApp }}
      >
        {/* Top bar - matches real DashboardPage header */}
        <div
          className="px-8 py-4 flex items-center justify-between"
          style={{
            borderBottom: '1px solid rgba(19, 18, 17, 0.10)',
          }}
        >
          <span
            className="text-lg font-bold"
            style={{ color: T.textOnLight }}
          >
            {title}
          </span>
          <span
            className="text-xs"
            style={{ color: T.textOnLight, opacity: 0.55 }}
          >
            Thursday, 8 May 2025
          </span>
        </div>
        <div className="flex-1 overflow-hidden px-8 py-6">
          {children}
        </div>
      </div>
    </div>
  )
}

/* -- Reusable tiny components -------------------------------- */

function Btn({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: {
  children: React.ReactNode
  variant?: 'default' | 'secondary' | 'ghost'
  size?: 'sm' | 'md'
  className?: string
}) {
  const base =
    'inline-flex items-center justify-center gap-1.5 font-medium transition-all rounded-lg'
  const sizeClass = size === 'sm' ? 'px-2.5 py-1.5 text-[10px]' : 'px-4 py-2 text-xs'
  const styles: Record<string, React.CSSProperties> = {
    default: {
      backgroundColor: T.btnPrimaryBg,
      color: T.btnPrimaryText,
      border: 'none',
    },
    secondary: {
      backgroundColor: T.btnSecondaryBg,
      color: T.btnSecondaryText,
      border: `1px solid ${T.btnSecondaryBorder}`,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: T.textOnLight,
      border: `1px solid ${T.borderOnLight}`,
    },
  }
  return (
    <div className={`${base} ${sizeClass} ${className}`} style={styles[variant]}>
      {children}
    </div>
  )
}

function VegBadge({ veg }: { veg: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full"
      style={{
        backgroundColor: veg ? T.greenDim : T.redDim,
        color: veg ? T.green : T.red,
      }}
    >
      <span
        className="inline-block w-2 h-2 rounded-full"
        style={{ backgroundColor: veg ? T.green : T.red }}
      />
      {veg ? 'VEG' : 'NON-VEG'}
    </span>
  )
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-full"
      style={{
        backgroundColor: active ? T.greenDim : 'rgba(107, 114, 128, 0.16)',
        color: active ? T.green : T.textMuted,
      }}
    >
      <span
        className="inline-block w-2 h-2 rounded-full"
        style={{ backgroundColor: active ? T.green : T.textMuted }}
      />
      {active ? 'Active' : 'Inactive'}
    </span>
  )
}

function SurfaceCard({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-2xl ${className}`}
      style={{
        backgroundColor: T.bgCard,
        border: `1px solid ${T.borderOnLight}`,
        color: T.textOnLight,
      }}
    >
      {children}
    </div>
  )
}

/* =============================================================
   Billing Screen (matches real BillingPage)
   ============================================================= */

export function BillingMock() {
  const categories = ['All', 'Starters', 'Mains', 'Drinks', 'Desserts']
  const items = [
    { name: 'Paneer Tikka', price: 220, veg: true },
    { name: 'Chicken 65', price: 280, veg: false },
    { name: 'Butter Naan', price: 60, veg: true },
    { name: 'Dal Makhani', price: 180, veg: true },
    { name: 'Biryani', price: 250, veg: false },
    { name: 'Mango Lassi', price: 90, veg: true },
    { name: 'Tandoori', price: 300, veg: false },
    { name: 'Gulab Jamun', price: 80, veg: true },
    { name: 'Masala Dosa', price: 120, veg: true },
  ]
  const cartItems = [
    { name: 'Paneer Tikka', qty: 2, price: 220, sgst: 2.5, cgst: 2.5 },
    { name: 'Butter Naan', qty: 3, price: 60, sgst: 2.5, cgst: 2.5 },
    { name: 'Mango Lassi', qty: 1, price: 90, sgst: 2.5, cgst: 2.5 },
  ]
  const subtotal = cartItems.reduce((s, c) => s + c.price * c.qty, 0)

  return (
    <MockFrame activeItem="Billing" title="Billing" height={520}>
      {/* matches real grid: grid-cols-1 xl:grid-cols-[1.5fr_1fr] */}
      <div className="grid grid-cols-[1.5fr_1fr] gap-4 h-full">
        {/* Left panel - item selection */}
        <SurfaceCard className="p-4 space-y-3 flex flex-col min-h-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-black" style={{ color: T.textOnLight }}>
                Billing
              </h2>
              <p className="text-[10px]" style={{ color: T.textMuted }}>
                Add items to cart and save/hold bill.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="rounded-full px-2 py-0.5 text-[9px] font-semibold"
                style={{ backgroundColor: T.greenDim, color: T.green }}
              >
                Printer: Ready
              </div>
              <Btn variant="secondary" size="sm">
                Select Table
              </Btn>
              <Btn variant="secondary" size="sm">
                <RefreshCw size={10} />
              </Btn>
            </div>
          </div>

          {/* Search + veg filters - matches real app layout */}
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex-1">
              <label
                className="text-[9px] uppercase mb-1 block"
                style={{ color: T.textMuted }}
              >
                Search Items
              </label>
              <div
                className="h-8 w-full rounded-lg px-3 text-[11px] flex items-center"
                style={{
                  backgroundColor: T.bgInput,
                  border: `1px solid ${T.borderOnLight}`,
                  color: T.textMuted,
                }}
              >
                Search any item by name or ID
              </div>
            </div>
            <div className="flex gap-1.5">
              <Btn size="sm">All</Btn>
              <div
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-medium rounded-lg"
                style={{
                  backgroundColor: T.bgInput,
                  border: `1px solid ${T.borderOnLight}`,
                  color: T.green,
                }}
              >
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ backgroundColor: T.green }}
                />
                Veg
              </div>
              <div
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-medium rounded-lg"
                style={{
                  backgroundColor: T.bgInput,
                  border: `1px solid ${T.borderOnLight}`,
                  color: T.red,
                }}
              >
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ backgroundColor: T.red }}
                />
                Non-Veg
              </div>
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex gap-1.5">
            {categories.map((c, i) => (
              <div
                key={c}
                className="px-2.5 py-1 rounded-lg text-[10px] font-medium"
                style={{
                  backgroundColor: i === 0 ? T.btnPrimaryBg : T.bgInput,
                  color: i === 0 ? T.btnPrimaryText : T.textMuted,
                  border: `1px solid ${i === 0 ? T.btnPrimaryBg : T.borderOnLight}`,
                }}
              >
                {c}
              </div>
            ))}
          </div>

          {/* Item grid */}
          <div className="grid grid-cols-3 gap-2 flex-1 min-h-0 overflow-auto">
            {items.map((item) => (
              <div
                key={item.name}
                className="rounded-lg p-2.5 flex flex-col justify-between"
                style={{
                  backgroundColor: T.bgCard,
                  border: `1px solid ${T.borderSubtle}`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-[11px] font-medium truncate"
                    style={{ color: T.textOnLight }}
                  >
                    {item.name}
                  </span>
                  <span
                    className="inline-block w-2 h-2 rounded-full shrink-0"
                    style={{
                      backgroundColor: item.veg ? T.green : T.red,
                    }}
                  />
                </div>
                <span
                  className="text-[11px] font-mono mt-1"
                  style={{ color: T.accent }}
                >
                  Rs. {item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </SurfaceCard>

        {/* Right panel - cart / bill */}
        <SurfaceCard className="p-4 flex flex-col min-h-0">
          <h3
            className="text-sm font-black mb-3"
            style={{ color: T.textOnLight }}
          >
            Current Bill
          </h3>

          {/* Cart items */}
          <div className="flex-1 space-y-2 overflow-auto mb-3">
            {cartItems.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between py-2"
                style={{ borderBottom: `1px solid ${T.borderSubtle}` }}
              >
                <div className="flex-1">
                  <span
                    className="text-[11px] font-medium"
                    style={{ color: T.textOnLight }}
                  >
                    {item.name}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center text-[10px]"
                      style={{
                        backgroundColor: T.bgInput,
                        border: `1px solid ${T.borderOnLight}`,
                        color: T.textOnLight,
                      }}
                    >
                      -
                    </div>
                    <span
                      className="text-[11px] font-mono w-4 text-center"
                      style={{ color: T.textOnLight }}
                    >
                      {item.qty}
                    </span>
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center text-[10px]"
                      style={{
                        backgroundColor: T.bgInput,
                        border: `1px solid ${T.borderOnLight}`,
                        color: T.textOnLight,
                      }}
                    >
                      +
                    </div>
                  </div>
                </div>
                <span
                  className="text-[11px] font-mono"
                  style={{ color: T.textOnLight }}
                >
                  Rs. {(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Discount row */}
          <div
            className="flex items-center gap-2 mb-2 py-2"
            style={{ borderTop: `1px solid ${T.borderSubtle}` }}
          >
            <div className="flex-1">
              <label
                className="text-[9px] uppercase block mb-0.5"
                style={{ color: T.textMuted }}
              >
                Discount %
              </label>
              <div
                className="h-7 rounded px-2 text-[10px] flex items-center"
                style={{
                  backgroundColor: T.bgInput,
                  border: `1px solid ${T.borderOnLight}`,
                  color: T.textMuted,
                }}
              >
                0
              </div>
            </div>
            <div className="flex-1">
              <label
                className="text-[9px] uppercase block mb-0.5"
                style={{ color: T.textMuted }}
              >
                Discount Amt
              </label>
              <div
                className="h-7 rounded px-2 text-[10px] flex items-center"
                style={{
                  backgroundColor: T.bgInput,
                  border: `1px solid ${T.borderOnLight}`,
                  color: T.textMuted,
                }}
              >
                0
              </div>
            </div>
          </div>

          {/* Totals */}
          <div
            className="space-y-1 py-2 text-[11px]"
            style={{ borderTop: `1px solid ${T.borderSubtle}` }}
          >
            <div className="flex justify-between">
              <span style={{ color: T.textMuted }}>Subtotal</span>
              <span style={{ color: T.textMuted }}>
                Rs. {subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: T.textMuted }}>SGST</span>
              <span style={{ color: T.textMuted }}>+Rs. 38.50</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: T.textMuted }}>CGST</span>
              <span style={{ color: T.textMuted }}>+Rs. 38.50</span>
            </div>
            <div
              className="flex justify-between font-black text-[13px] pt-1"
            >
              <span style={{ color: T.textOnLight }}>Total</span>
              <span style={{ color: T.textOnLight }}>
                Rs. {(subtotal + 77).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Action buttons - matches real app grid-cols-2 */}
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Btn variant="secondary">Hold Bill</Btn>
            <Btn>Save Bill</Btn>
          </div>
        </SurfaceCard>
      </div>
    </MockFrame>
  )
}

/* =============================================================
   Categories Screen (matches real CategoriesPage)
   ============================================================= */

export function CategoriesMock() {
  const cats = [
    { name: 'Starters', active: true },
    { name: 'Mains', active: true },
    { name: 'Drinks', active: true },
    { name: 'Desserts', active: true },
    { name: 'Breads', active: true },
    { name: 'Combos', active: false },
    { name: 'Specials', active: true },
    { name: 'Soups', active: false },
  ]

  return (
    <MockFrame activeItem="Categories" title="Categories" height={480}>
      <div className="space-y-4">
        {/* Header section - matches real app */}
        <SurfaceCard className="p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2
                className="text-xl font-black"
                style={{ color: T.textOnLight }}
              >
                Category Management
              </h2>
              <p
                className="text-sm mt-1"
                style={{ color: T.textMuted }}
              >
                {cats.length} categories
              </p>
            </div>
            <Btn>Add Category</Btn>
          </div>

          {/* Search + status filter */}
          <div className="flex flex-wrap gap-3">
            <div
              className="h-10 rounded-lg px-3 w-64 flex items-center text-sm"
              style={{
                backgroundColor: T.bgInput,
                border: `1px solid ${T.borderOnLight}`,
                color: T.textMuted,
              }}
            >
              Search categories...
            </div>
            <div
              className="h-10 rounded-lg px-3 flex items-center text-sm"
              style={{
                backgroundColor: T.bgInput,
                border: `1px solid ${T.borderOnLight}`,
                color: T.textMuted,
              }}
            >
              All Status ▾
            </div>
          </div>
        </SurfaceCard>

        {/* Table - matches real app table structure */}
        <SurfaceCard className="overflow-hidden">
          <div className="overflow-auto">
            <table className="w-full min-w-[560px]">
              <thead
                style={{
                  backgroundColor: T.bgInput,
                  borderBottom: `1px solid ${T.borderOnLight}`,
                }}
              >
                <tr>
                  <th
                    className="px-3 py-2 text-left text-[10px] uppercase cursor-pointer"
                    style={{ color: T.textMuted }}
                  >
                    Name [A]
                  </th>
                  <th
                    className="px-3 py-2 text-left text-[10px] uppercase cursor-pointer"
                    style={{ color: T.textMuted }}
                  >
                    Status
                  </th>
                  <th
                    className="px-3 py-2 text-left text-[10px] uppercase"
                    style={{ color: T.textMuted }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {cats.map((cat) => (
                  <tr
                    key={cat.name}
                    style={{ borderBottom: `1px solid ${T.borderSubtle}` }}
                  >
                    <td
                      className="px-3 py-2 text-sm font-medium"
                      style={{ color: T.textOnLight }}
                    >
                      {cat.name}
                    </td>
                    <td className="px-3 py-2">
                      <StatusBadge active={cat.active} />
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex gap-1">
                        <Btn variant="secondary" size="sm">
                          Edit
                        </Btn>
                        <Btn variant="ghost" size="sm">
                          {cat.active ? 'Deactivate' : 'Activate'}
                        </Btn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SurfaceCard>
      </div>
    </MockFrame>
  )
}

/* =============================================================
   Menu Screen (matches real MenuPage)
   ============================================================= */

export function MenuMock() {
  const items = [
    { id: 1, name: 'Paneer Tikka', category: 'Starters', price: 220, veg: true, sgst: 2.5, cgst: 2.5, active: true },
    { id: 2, name: 'Chicken 65', category: 'Starters', price: 280, veg: false, sgst: 2.5, cgst: 2.5, active: true },
    { id: 3, name: 'Butter Naan', category: 'Breads', price: 60, veg: true, sgst: 2.5, cgst: 2.5, active: true },
    { id: 4, name: 'Dal Makhani', category: 'Mains', price: 180, veg: true, sgst: 2.5, cgst: 2.5, active: true },
    { id: 5, name: 'Biryani', category: 'Mains', price: 250, veg: false, sgst: 5, cgst: 5, active: false },
    { id: 6, name: 'Mango Lassi', category: 'Drinks', price: 90, veg: true, sgst: 2.5, cgst: 2.5, active: true },
  ]

  return (
    <MockFrame activeItem="Menu" title="Menu" height={480}>
      <div className="space-y-4">
        <SurfaceCard className="p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2
                className="text-xl font-black"
                style={{ color: T.textOnLight }}
              >
                Menu Management
              </h2>
              <p className="text-sm mt-1" style={{ color: T.textMuted }}>
                {items.length} items
              </p>
            </div>
            <Btn>Add Item</Btn>
          </div>

          {/* Filters row - matches real app */}
          <div className="flex flex-wrap gap-3">
            <div
              className="h-10 rounded-lg px-3 w-52 flex items-center text-sm"
              style={{
                backgroundColor: T.bgInput,
                border: `1px solid ${T.borderOnLight}`,
                color: T.textMuted,
              }}
            >
              Search items...
            </div>
            <div
              className="h-10 rounded-lg px-3 flex items-center text-sm"
              style={{
                backgroundColor: T.bgInput,
                border: `1px solid ${T.borderOnLight}`,
                color: T.textMuted,
              }}
            >
              All Categories ▾
            </div>
            <div
              className="h-10 rounded-lg px-3 flex items-center text-sm"
              style={{
                backgroundColor: T.bgInput,
                border: `1px solid ${T.borderOnLight}`,
                color: T.textMuted,
              }}
            >
              All Types ▾
            </div>
            <div
              className="h-10 rounded-lg px-3 flex items-center text-sm"
              style={{
                backgroundColor: T.bgInput,
                border: `1px solid ${T.borderOnLight}`,
                color: T.textMuted,
              }}
            >
              All Status ▾
            </div>
          </div>
        </SurfaceCard>

        <SurfaceCard className="overflow-hidden">
          <div className="overflow-auto">
            <table className="w-full min-w-[800px]">
              <thead
                style={{
                  backgroundColor: T.bgInput,
                  borderBottom: `1px solid ${T.borderOnLight}`,
                }}
              >
                <tr>
                  {['ID', 'Name', 'Category', 'Price', 'Type', 'Tax', 'Status', 'Actions'].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-3 py-2 text-left text-[10px] uppercase tracking-[0.15em]"
                        style={{ color: T.textMuted }}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    style={{ borderBottom: `1px solid ${T.borderSubtle}` }}
                  >
                    <td
                      className="px-3 py-2 text-sm font-mono"
                      style={{ color: T.textMuted }}
                    >
                      {item.id}
                    </td>
                    <td
                      className="px-3 py-2 text-sm font-medium"
                      style={{ color: T.textOnLight }}
                    >
                      {item.name}
                    </td>
                    <td
                      className="px-3 py-2 text-sm"
                      style={{ color: T.textMuted }}
                    >
                      {item.category}
                    </td>
                    <td
                      className="px-3 py-2 text-sm font-mono"
                      style={{ color: T.textOnLight }}
                    >
                      Rs. {item.price.toFixed(2)}
                    </td>
                    <td className="px-3 py-2">
                      <VegBadge veg={item.veg} />
                    </td>
                    <td
                      className="px-3 py-2 text-[10px]"
                      style={{ color: T.textMuted }}
                    >
                      SGST: {item.sgst.toFixed(2)} | CGST: {item.cgst.toFixed(2)}
                    </td>
                    <td className="px-3 py-2">
                      <StatusBadge active={item.active} />
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex gap-1">
                        <Btn variant="secondary" size="sm">
                          Edit
                        </Btn>
                        <Btn variant="ghost" size="sm">
                          {item.active ? 'Deactivate' : 'Activate'}
                        </Btn>
                        <div
                          className="inline-flex items-center px-2.5 py-1.5 text-[10px] font-medium rounded-lg"
                          style={{ color: T.red }}
                        >
                          Delete
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SurfaceCard>
      </div>
    </MockFrame>
  )
}

/* =============================================================
   History Screen (matches real HistoryPage)
   ============================================================= */

export function HistoryMock() {
  const orders = [
    { billno: '#1043', date: '08-05-2025', price: 710, tax: 52, items: '3 items' },
    { billno: '#1042', date: '08-05-2025', price: 1450, tax: 98, items: '7 items' },
    { billno: '#1041', date: '08-05-2025', price: 380, tax: 28, items: '2 items' },
    { billno: '#1040', date: '07-05-2025', price: 820, tax: 61, items: '4 items' },
    { billno: '#1039', date: '07-05-2025', price: 1120, tax: 84, items: '6 items' },
    { billno: '#1038', date: '07-05-2025', price: 920, tax: 68, items: '5 items' },
  ]
  const totalOrders = orders.length
  const totalAmount = orders.reduce((s, o) => s + o.price, 0)
  const totalTax = orders.reduce((s, o) => s + o.tax, 0)

  return (
    <MockFrame
      activeItem="History"
      expandedItem="history"
      title="History"
      height={520}
    >
      <div className="space-y-4">
        {/* Date range section - matches real HistoryPage */}
        <SurfaceCard className="p-5 space-y-4">
          <div className="space-y-1">
            <h2
              className="text-xl font-black"
              style={{ color: T.textOnLight }}
            >
              Order History
            </h2>
            <p className="text-sm" style={{ color: T.textMuted }}>
              Review past orders by date range and remove records when needed.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label
                  className="text-[9px] uppercase mb-1 block"
                  style={{ color: T.textMuted }}
                >
                  Start Date
                </label>
                <div
                  className="h-10 rounded-lg px-3 flex items-center text-sm"
                  style={{
                    backgroundColor: T.bgInput,
                    border: `1px solid ${T.borderOnLight}`,
                    color: T.textOnLight,
                  }}
                >
                  07-05-2025
                </div>
              </div>
              <div>
                <label
                  className="text-[9px] uppercase mb-1 block"
                  style={{ color: T.textMuted }}
                >
                  End Date
                </label>
                <div
                  className="h-10 rounded-lg px-3 flex items-center text-sm"
                  style={{
                    backgroundColor: T.bgInput,
                    border: `1px solid ${T.borderOnLight}`,
                    color: T.textOnLight,
                  }}
                >
                  08-05-2025
                </div>
              </div>
            </div>
            <Btn className="h-14">Show History</Btn>
          </div>
        </SurfaceCard>

        {/* Summary cards - matches real HistoryPage */}
        <div className="grid grid-cols-3 gap-3">
          <SurfaceCard className="p-5">
            <p
              className="text-[10px] uppercase tracking-[0.15em]"
              style={{ color: T.textMuted }}
            >
              Orders
            </p>
            <p
              className="text-2xl font-black"
              style={{ color: T.textOnLight }}
            >
              {totalOrders}
            </p>
          </SurfaceCard>
          <SurfaceCard className="p-5">
            <p
              className="text-[10px] uppercase tracking-[0.15em]"
              style={{ color: T.textMuted }}
            >
              Total Amount
            </p>
            <p
              className="text-2xl font-black"
              style={{ color: T.textOnLight }}
            >
              Rs. {totalAmount.toFixed(2)}
            </p>
          </SurfaceCard>
          <SurfaceCard className="p-5">
            <p
              className="text-[10px] uppercase tracking-[0.15em]"
              style={{ color: T.textMuted }}
            >
              Total Tax
            </p>
            <p
              className="text-2xl font-black"
              style={{ color: T.textOnLight }}
            >
              Rs. {totalTax.toFixed(2)}
            </p>
          </SurfaceCard>
        </div>

        {/* Orders table - matches real HistoryTable */}
        <SurfaceCard className="overflow-hidden">
          <div className="overflow-auto">
            <table className="w-full">
              <thead
                style={{
                  backgroundColor: T.bgInput,
                  borderBottom: `1px solid ${T.borderOnLight}`,
                }}
              >
                <tr>
                  {['Bill No', 'Date', 'Items', 'Amount', 'Tax', 'Actions'].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-3 py-2 text-left text-[10px] uppercase"
                        style={{ color: T.textMuted }}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr
                    key={o.billno}
                    style={{ borderBottom: `1px solid ${T.borderSubtle}` }}
                  >
                    <td
                      className="px-3 py-2 text-sm font-mono"
                      style={{ color: T.accent }}
                    >
                      {o.billno}
                    </td>
                    <td
                      className="px-3 py-2 text-sm"
                      style={{ color: T.textMuted }}
                    >
                      {o.date}
                    </td>
                    <td
                      className="px-3 py-2 text-sm"
                      style={{ color: T.textMuted }}
                    >
                      {o.items}
                    </td>
                    <td
                      className="px-3 py-2 text-sm font-mono"
                      style={{ color: T.textOnLight }}
                    >
                      Rs. {o.price.toFixed(2)}
                    </td>
                    <td
                      className="px-3 py-2 text-sm font-mono"
                      style={{ color: T.textMuted }}
                    >
                      Rs. {o.tax.toFixed(2)}
                    </td>
                    <td className="px-3 py-2">
                      <div
                        className="inline-flex items-center px-2.5 py-1.5 text-[10px] font-medium rounded-lg"
                        style={{ color: T.red }}
                      >
                        Delete
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SurfaceCard>
      </div>
    </MockFrame>
  )
}

/* =============================================================
   Reports Screen (matches real ReportsPage Day End Summary)
   ============================================================= */

export function ReportsMock() {
  const dayEndStats = [
    { label: 'Revenue', value: 'Rs. 4,320.00' },
    { label: 'Sales', value: '12' },
    { label: 'Tax', value: 'Rs. 324.00' },
    { label: 'Discounted', value: '2' },
    { label: 'Deleted', value: '0' },
    { label: 'Yesterday Revenue', value: 'Rs. 3,860.00' },
  ]
  const mostSoldItems = [
    { name: 'Paneer Tikka', qty: 8 },
    { name: 'Butter Naan', qty: 12 },
    { name: 'Biryani', qty: 5 },
  ]
  const mostSoldCategories = [
    { name: 'Starters', units: 15 },
    { name: 'Mains', units: 22 },
    { name: 'Drinks', units: 9 },
  ]

  return (
    <MockFrame
      activeItem="Reports"
      expandedItem="reports"
      title="Reports"
      height={540}
    >
      <div className="space-y-4">
        {/* Header with date range */}
        <SurfaceCard className="p-5 space-y-4">
          <div className="space-y-1">
            <h2
              className="text-xl font-black"
              style={{ color: T.textOnLight }}
            >
              Reports
            </h2>
            <p className="text-sm" style={{ color: T.textMuted }}>
              Generate summaries, date-range reports, and exports using the same
              app theme.
            </p>
          </div>
          <div className="flex items-end gap-3">
            <Btn>
              <RefreshCw size={12} />
              Refresh
            </Btn>
          </div>
        </SurfaceCard>

        {/* Day End Summary - stat cards grid */}
        <div className="grid grid-cols-3 gap-3">
          {dayEndStats.map((s) => (
            <SurfaceCard key={s.label} className="p-4 md:p-5 space-y-1">
              <p
                className="text-[10px] uppercase tracking-[0.15em]"
                style={{ color: T.textMuted }}
              >
                {s.label}
              </p>
              <p
                className="text-lg font-black leading-none"
                style={{ color: T.textOnLight }}
              >
                {s.value}
              </p>
            </SurfaceCard>
          ))}
        </div>

        {/* Lists section - Most Sold Items & Categories */}
        <div className="grid grid-cols-2 gap-4">
          <SurfaceCard className="p-4 md:p-5">
            <p
              className="text-[10px] uppercase tracking-[0.15em] mb-3"
              style={{ color: T.textMuted }}
            >
              Most Sold Items
            </p>
            <div className="space-y-2">
              {mostSoldItems.map((item, i) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <span
                    className="text-sm"
                    style={{ color: T.textOnLight }}
                  >
                    {i + 1}. {item.name}
                  </span>
                  <span
                    className="text-sm font-mono"
                    style={{ color: T.textMuted }}
                  >
                    {item.qty} sold
                  </span>
                </div>
              ))}
            </div>
          </SurfaceCard>
          <SurfaceCard className="p-4 md:p-5">
            <p
              className="text-[10px] uppercase tracking-[0.15em] mb-3"
              style={{ color: T.textMuted }}
            >
              Most Sold Categories
            </p>
            <div className="space-y-2">
              {mostSoldCategories.map((cat, i) => (
                <div
                  key={cat.name}
                  className="flex items-center justify-between"
                >
                  <span
                    className="text-sm"
                    style={{ color: T.textOnLight }}
                  >
                    {i + 1}. {cat.name}
                  </span>
                  <span
                    className="text-sm font-mono"
                    style={{ color: T.textMuted }}
                  >
                    {cat.units} units
                  </span>
                </div>
              ))}
            </div>
          </SurfaceCard>
        </div>
      </div>
    </MockFrame>
  )
}

/* =============================================================
   Settings Screen (matches real SettingsPage - Theme + Tax)
   ============================================================= */

export function SettingsMock() {
  const presets = [
    {
      key: 'creamCharcoal',
      title: 'Cream + Charcoal',
      subtitle: 'EEE5DA and 262424',
      colors: ['#262424', '#EEE5DA', '#6B6B6B'],
      active: true,
    },
    {
      key: 'navySunburst',
      title: 'Navy + Sunburst',
      subtitle: '0A122A and FFF7E6',
      colors: ['#0A122A', '#FFF7E6', '#6B6B6B'],
      active: false,
    },
    {
      key: 'forestCream',
      title: 'Forest + Cream',
      subtitle: '004643 and F0EDE5',
      colors: ['#004643', '#F0EDE5', '#6B6B6B'],
      active: false,
    },
  ]

  return (
    <MockFrame
      activeItem="Settings"
      expandedItem="settings"
      title="Settings"
      height={520}
    >
      <div className="space-y-6">
        {/* Theme section - matches real ThemeTab */}
        <SurfaceCard className="p-5 space-y-5">
          <div>
            <h2
              className="text-xl font-black"
              style={{ color: T.textOnLight }}
            >
              Theme
            </h2>
            <p className="text-sm mt-1" style={{ color: T.textMuted }}>
              Switch between presets any time. More presets can be added easily.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {presets.map((preset) => (
              <div
                key={preset.key}
                className="rounded-xl p-4 space-y-3"
                style={{
                  border: `1px solid ${
                    preset.active ? T.borderOnLight : T.borderSubtle
                  }`,
                }}
              >
                <div>
                  <p
                    className="text-sm font-bold"
                    style={{ color: T.textOnLight }}
                  >
                    {preset.title}
                  </p>
                  <p
                    className="text-[10px] mt-1"
                    style={{ color: T.textMuted }}
                  >
                    {preset.subtitle}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {preset.colors.map((color) => (
                    <div
                      key={`${preset.key}-${color}`}
                      className="h-8 w-8 rounded-md"
                      style={{
                        backgroundColor: color,
                        border: `1px solid ${T.borderOnLight}`,
                      }}
                    />
                  ))}
                </div>
                <Btn variant={preset.active ? 'default' : 'secondary'}>
                  {preset.active ? 'Active' : 'Use This Theme'}
                </Btn>
              </div>
            ))}
          </div>
        </SurfaceCard>

        {/* Tax Settings section - matches real TaxSettingsTab */}
        <SurfaceCard className="p-5 space-y-4">
          <div>
            <h2
              className="text-xl font-black"
              style={{ color: T.textOnLight }}
            >
              Tax Settings
            </h2>
            <p className="text-sm mt-1" style={{ color: T.textMuted }}>
              Control how tax is applied across billing, reports, and receipts.
            </p>
          </div>

          <div
            className="flex items-center justify-between gap-3 rounded-lg p-3"
            style={{ border: `1px solid ${T.borderOnLight}` }}
          >
            <div>
              <p className="text-sm" style={{ color: T.textOnLight }}>
                Enable Tax
              </p>
              <p
                className="text-[10px] mt-1"
                style={{ color: T.textMuted }}
              >
                When enabled, SGST and CGST from each menu item are calculated
                and shown on bills and reports.
              </p>
            </div>
            <div
              className="w-10 h-5 rounded-full relative"
              style={{ backgroundColor: T.btnPrimaryBg }}
            >
              <div
                className="w-4 h-4 rounded-full absolute top-0.5"
                style={{
                  backgroundColor: T.btnPrimaryText,
                  right: 2,
                }}
              />
            </div>
          </div>

          <div
            className="flex items-center justify-between gap-3 rounded-lg p-3"
            style={{ border: `1px solid ${T.borderOnLight}` }}
          >
            <div>
              <p className="text-sm" style={{ color: T.textOnLight }}>
                Tax Included In Price
              </p>
              <p
                className="text-[10px] mt-1"
                style={{ color: T.textMuted }}
              >
                When enabled, the item price already includes tax. The tax
                amount is extracted from the displayed price.
              </p>
            </div>
            <div
              className="w-10 h-5 rounded-full relative"
              style={{ backgroundColor: T.borderSubtle }}
            >
              <div
                className="w-4 h-4 rounded-full absolute top-0.5"
                style={{
                  backgroundColor: T.textMuted,
                  left: 2,
                }}
              />
            </div>
          </div>
        </SurfaceCard>
      </div>
    </MockFrame>
  )
}

/* -- Named export map ----------------------------------------- */

export type MockScreen =
  | 'billing'
  | 'categories'
  | 'menu'
  | 'history'
  | 'reports'
  | 'settings'

export const MOCK_SCREENS: Record<MockScreen, React.ComponentType> = {
  billing: BillingMock,
  categories: CategoriesMock,
  menu: MenuMock,
  history: HistoryMock,
  reports: ReportsMock,
  settings: SettingsMock,
}

/* =============================================================
   Interactive Billing Mock (used in Hero section)
   ============================================================= */

export function InteractiveBillingMock() {
  return <BillingMock />
}
