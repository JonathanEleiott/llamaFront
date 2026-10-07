import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  FolderTree,
  Tag,
  Megaphone,
  TrendingUp,
  Eye,
  DollarSign,
  ShoppingBag,
  ArrowRight,
  Plus,
  Search,
  RefreshCw,
} from 'lucide-react';
import { Button } from '../../components/common';
import { useBakery } from '../../context/BakeryContext';
import { apiService } from '../../api/apiService';
import './Dashboard.css';

const Dashboard = () => {
  const { products, categories, activeSpecials, activePromotions } = useBakery();
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState('');
  const [orderSearch, setOrderSearch] = useState('');

  const loadOrders = async () => {
    setOrdersLoading(true);
    setOrdersError('');
    try {
      const response = await apiService.getAdminOrders();
      const rows = Array.isArray(response)
        ? response
        : response.orders ?? response.data?.orders ?? response.data ?? [];
      setOrders(Array.isArray(rows) ? rows : []);
    } catch (error) {
      setOrdersError(error.message || 'Unable to load order history.');
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    const query = orderSearch.trim().toLowerCase();
    const newestFirst = [...orders].sort((a, b) =>
      new Date(b.createdAt ?? b.created_at ?? 0) - new Date(a.createdAt ?? a.created_at ?? 0)
    );
    if (!query) return newestFirst;
    return newestFirst.filter((order) => [
      order.orderNumber, order.order_number, order.id,
      order.customerName, order.customer_name, order.customer?.name,
      order.email, order.customerEmail, order.customer_email, order.status,
    ].some((value) => String(value ?? '').toLowerCase().includes(query)));
  }, [orders, orderSearch]);

  const formatOrderDate = (value) => value
    ? new Date(value).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
    : '—';

  // Calculate statistics
  const stats = [
    {
      label: 'Total Products',
      value: products.length,
      icon: Package,
      color: '#5c3d2e',
      change: '+12%',
      changeType: 'positive',
    },
    {
      label: 'Categories',
      value: categories.length,
      icon: FolderTree,
      color: '#7a5240',
      change: null,
    },
    {
      label: 'Active Specials',
      value: activeSpecials.length,
      icon: Tag,
      color: '#dc2626',
      change: '3 expiring soon',
      changeType: 'warning',
    },
    {
      label: 'Promotions',
      value: activePromotions.length,
      icon: Megaphone,
      color: '#16a34a',
      change: '+2 this month',
      changeType: 'positive',
    },
  ];

  const quickActions = [
    { label: 'Add Product', path: '/admin/products/new', icon: Package },
    { label: 'New Category', path: '/admin/categories/new', icon: FolderTree },
    { label: 'Create Special', path: '/admin/specials/new', icon: Tag },
    { label: 'Add Promotion', path: '/admin/promotions/new', icon: Megaphone },
  ];

  const recentProducts = products.slice(0, 5);
  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Welcome back! Here's what's happening with your bakery.</p>
        </div>
        <Button icon={Plus}>
          <Link to="/admin/products/new" style={{ color: 'inherit', textDecoration: 'none' }}>
            Add Product
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              <stat.icon size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
              {stat.change && (
                <span className={`stat-change ${stat.changeType}`}>
                  {stat.change}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <section className="quick-actions-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.path} className="quick-action-card">
              <div className="action-icon">
                <action.icon size={24} />
              </div>
              <span>{action.label}</span>
              <ArrowRight size={18} className="action-arrow" />
            </Link>
          ))}
        </div>
      </section>

      <div className="dashboard-grid">
        {/* Recent Products */}
        <section className="recent-section">
          <div className="section-header">
            <h2 className="section-title">Recent Products</h2>
            <Link to="/admin/products" className="view-all-link">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="recent-list">
            {recentProducts.map((product) => (
              <div key={product.id} className="recent-item">
                <div className="item-image">
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt={product.name} />
                  ) : (
                    <div className="image-placeholder">
                      <ShoppingBag size={20} />
                    </div>
                  )}
                </div>
                <div className="item-info">
                  <span className="item-name">{product.name}</span>
                  <span className="item-category">
                    {categories.find(c => c.id === (product.categoryId || product.category_id))?.name || 'Uncategorized'}
                  </span>
                </div>
                <span className="item-price">${parseFloat(product.price).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Active Promotions */}
        <section className="promotions-section">
          <div className="section-header">
            <h2 className="section-title">Active Promotions</h2>
            <Link to="/admin/promotions" className="view-all-link">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="promo-list">
            {activePromotions.length > 0 ? (
              activePromotions.slice(0, 3).map((promo) => (
                <div key={promo.id} className="promo-item">
                  <div
                    className="promo-color"
                    style={{ backgroundColor: promo.backgroundColor || '#f8e8d4' }}
                  />
                  <div className="promo-info">
                    <span className="promo-name">{promo.name}</span>
                    <span className="promo-title">{promo.title}</span>
                  </div>
                  <span className={`promo-status ${promo.active ? 'active' : ''}`}>
                    {promo.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <Megaphone size={32} />
                <p>No active promotions</p>
                <Link to="/admin/promotions/new">Create one</Link>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Activity Overview */}
      <section className="activity-section">
        <h2 className="section-title">Activity Overview</h2>
        <div className="activity-placeholder">
          <TrendingUp size={48} />
          <p>Analytics dashboard coming soon</p>
          <span>Track your bakery's performance with detailed charts and insights</span>
        </div>
      </section>

      <section className="order-history-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Order History</h2>
            <p className="order-history-subtitle">All customer orders, newest first</p>
          </div>
          <button className="order-refresh-button" onClick={loadOrders} disabled={ordersLoading}>
            <RefreshCw size={16} className={ordersLoading ? 'spinning' : ''} />
            Refresh
          </button>
        </div>

        <label className="order-history-search">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            placeholder="Search order, customer, email, or status"
            value={orderSearch}
            onChange={(event) => setOrderSearch(event.target.value)}
          />
        </label>

        {ordersLoading ? (
          <p className="order-history-message" role="status">Loading order history…</p>
        ) : ordersError ? (
          <div className="order-history-message order-history-error" role="alert">
            <span>{ordersError}</span>
            <button onClick={loadOrders}>Try again</button>
          </div>
        ) : (
          <div className="order-history-table-wrap">
            <table className="order-history-table">
              <thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Status</th><th>Items</th><th>Total</th></tr></thead>
              <tbody>
                {filteredOrders.map((order, index) => {
                  const orderId = order.id ?? order.orderId ?? order.order_id ?? index;
                  const customerName = order.customerName ?? order.customer_name ?? order.customer?.name ?? 'Guest';
                  const email = order.customerEmail ?? order.customer_email ?? order.email ?? order.customer?.email ?? '';
                  const items = order.items ?? order.orderItems ?? order.order_items ?? [];
                  const itemCount = Array.isArray(items) ? items.reduce((count, item) => count + Number(item.quantity ?? 1), 0) : Number(order.itemCount ?? order.item_count ?? 0);
                  const status = order.status ?? 'Pending';
                  const total = Number(order.total ?? order.totalAmount ?? order.total_amount ?? 0);
                  return (
                    <tr key={orderId}>
                      <td className="order-history-number">{order.orderNumber ?? order.order_number ?? `#${orderId}`}</td>
                      <td><span className="order-customer-name">{customerName}</span>{email && <span className="order-customer-email">{email}</span>}</td>
                      <td>{formatOrderDate(order.createdAt ?? order.created_at ?? order.date)}</td>
                      <td><span className={`order-history-status status-${String(status).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>{status}</span></td>
                      <td>{itemCount}</td>
                      <td>${Number.isFinite(total) ? total.toFixed(2) : '0.00'}</td>
                    </tr>
                  );
                })}
                {filteredOrders.length === 0 && <tr><td colSpan="6" className="order-history-empty">{orders.length ? 'No orders match your search.' : 'No orders yet.'}</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
