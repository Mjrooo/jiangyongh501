import { useState, useEffect, type FormEvent, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home as HomeIcon, 
  Map as MapIcon, 
  ShoppingBag, 
  Utensils, 
  ChevronRight, 
  Phone, 
  AlertCircle, 
  Info, 
  Navigation,
  Cloud,
  Users,
  Car,
  Video,
  X,
  Star
} from 'lucide-react';
import { SCENIC_SPOTS, ROUTES, PRODUCTS, RESTAURANTS, ENCYCLOPEDIA, GUIDES } from './constants';
import { ScenicSpot, Route, Product, Restaurant } from './types';

// --- Components ---

const TabButton = ({ active, icon: Icon, label, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full py-2 transition-colors ${active ? 'text-emerald-600' : 'text-zinc-400'}`}
  >
    <Icon size={24} />
    <span className="text-xs mt-1">{label}</span>
  </button>
);

const SectionHeader = ({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) => (
  <div className="px-5 py-6 flex justify-between items-end">
    <div>
      <h2 className="text-xl font-bold text-zinc-900 tracking-tight">{title}</h2>
      {subtitle && <p className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider mt-0.5">{subtitle}</p>}
    </div>
    {action}
  </div>
);

// --- Pages ---

const HomePage = ({ setTab }: any) => {
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [stats, setStats] = useState({ todayVisitors: 0, totalVisitors: 0 });
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    fetch('/api/weather').then(res => res.json()).then(setWeatherData);
    fetch('/api/stats').then(res => res.json()).then(setStats);
  }, []);

  return (
    <div className="pb-24 bg-white">
      {/* Hero Section - Editorial Style */}
      <div className="relative h-[420px] bg-zinc-900 overflow-hidden">
        <img 
          src="https://picsum.photos/seed/jiangyong-landscape/1200/1600" 
          alt="Jiangyong Hero" 
          className="w-full h-full object-cover opacity-80"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white" />
        
        <div className="absolute top-12 left-6 right-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-[1px] w-8 bg-emerald-400" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-emerald-400">Cultural Heritage</span>
          </div>
          <h1 className="text-5xl font-bold leading-[0.9] tracking-tighter mb-4">
            惊世女书<br />
            <span className="text-emerald-400 italic font-serif">相约江永</span>
          </h1>
          <p className="text-xs opacity-70 max-w-[200px] leading-relaxed">
            中国最具文化品位小城，探索神秘女性文字的发源地。
          </p>
          
          {/* Visitor Stats Optimization */}
          <div className="mt-8 flex gap-6">
            <div>
              <div className="text-[10px] opacity-50 uppercase tracking-widest mb-1">Today Visitors</div>
              <div className="text-xl font-mono font-bold text-emerald-400">{stats.todayVisitors.toLocaleString()}</div>
            </div>
            <div className="w-[1px] h-8 bg-white/10 self-end" />
            <div>
              <div className="text-[10px] opacity-50 uppercase tracking-widest mb-1">Total Visits</div>
              <div className="text-xl font-mono font-bold">{stats.totalVisitors.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-6 right-6 flex items-end justify-between">
          <button 
            onClick={() => setShowVideo(true)}
            className="flex items-center gap-3 bg-white/10 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/20 text-white group"
          >
            <div className="bg-emerald-500 p-2 rounded-full group-hover:scale-110 transition-transform">
              <Video size={16} fill="white" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[10px] opacity-60 uppercase font-bold tracking-wider">Play Video</span>
              <span className="text-xs font-bold">全域旅游宣传片</span>
            </div>
          </button>
        </div>
      </div>

      {/* Quick Framework Links - Bento Style */}
      <div className="px-5 -mt-6 relative z-10">
        <div className="grid grid-cols-4 gap-3">
          <button className="col-span-2 bg-emerald-600 p-5 rounded-[2rem] text-white flex flex-col justify-between h-32 shadow-xl shadow-emerald-600/20">
            <Navigation size={24} />
            <div>
              <div className="text-xs opacity-70">Navigation</div>
              <div className="font-bold">全域导航</div>
            </div>
          </button>
          <button 
            onClick={() => setTab('encyclopedia')}
            className="bg-zinc-900 p-5 rounded-[2rem] text-white flex flex-col justify-between h-32"
          >
            <div className="flex flex-col justify-between h-full">
              <Info size={24} className="text-emerald-400" />
              <div className="font-bold text-xs">江永<br/>百科</div>
            </div>
          </button>
          <button 
            onClick={() => setTab('products')}
            className="bg-zinc-100 p-5 rounded-[2rem] text-zinc-900 flex flex-col justify-between h-32 border border-zinc-200"
          >
            <ShoppingBag size={24} className="text-emerald-600" />
            <div className="font-bold text-xs">网上<br/>订购</div>
          </button>
        </div>
      </div>

      {/* Scenic Spot Live - Minimal Utility Style */}
      <SectionHeader 
        title="景区实况" 
        subtitle="Real-time Status" 
        action={<span className="text-[10px] text-emerald-600 font-bold border-b border-emerald-600 pb-0.5">查看全部</span>}
      />
      <div className="px-5 space-y-4">
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {weatherData.map((spot, i) => (
            <div key={i} className="min-w-[240px] bg-zinc-50 p-5 rounded-[2rem] border border-zinc-100 flex flex-col justify-between h-40">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-zinc-900">{spot.name}</h3>
                <div className="bg-white px-2 py-1 rounded-lg text-[10px] font-bold text-emerald-600 border border-zinc-100">
                  {spot.flow}
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center border border-zinc-100">
                    <Cloud size={16} className="text-blue-400" />
                  </div>
                  <span className="text-xs font-medium text-zinc-600">{spot.weather}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center border border-zinc-100">
                    <Car size={16} className="text-zinc-400" />
                  </div>
                  <span className="text-xs font-medium text-zinc-600">剩余车位 {spot.parking}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Guide - Clean Grid */}
      <SectionHeader title="服务引导" subtitle="Service Guide" />
      <div className="px-5 grid grid-cols-2 gap-4">
        {[
          { icon: Navigation, label: '官网链接', desc: 'Official Site', color: 'text-blue-500' },
          { icon: AlertCircle, label: '在线投诉', desc: 'Complaints', color: 'text-rose-500', action: () => setTab('complaint') },
          { icon: Phone, label: '医疗救援', desc: 'Emergency', color: 'text-emerald-500', action: () => setTab('medical') },
          { icon: Info, label: '预订指南', desc: 'Tutorial', color: 'text-amber-500', action: () => setTab('guide') },
        ].map((item, i) => (
          <button 
            key={i} 
            onClick={item.action}
            className="bg-white p-5 rounded-[2rem] border border-zinc-100 text-left hover:bg-zinc-50 transition-colors group"
          >
            <div className={`${item.color} mb-3 group-hover:scale-110 transition-transform`}>
              <item.icon size={20} />
            </div>
            <div className="font-bold text-sm text-zinc-900">{item.label}</div>
            <div className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider mt-0.5">{item.desc}</div>
          </button>
        ))}
        
        <a href="tel:0746-8888888" className="col-span-2 bg-zinc-900 p-6 rounded-[2rem] flex items-center justify-between group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white">
              <Phone size={20} />
            </div>
            <div>
              <div className="text-white font-bold text-sm">永明旅游快行线预约</div>
              <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-0.5">Transportation</div>
            </div>
          </div>
          <ChevronRight size={20} className="text-zinc-600 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>


      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4"
          >
            <button 
              onClick={() => setShowVideo(false)}
              className="absolute top-6 right-6 text-white p-2 bg-white/10 rounded-full"
            >
              <X size={24} />
            </button>
            <div className="w-full aspect-video bg-zinc-800 rounded-xl overflow-hidden shadow-2xl">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="Jiangyong Promo"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ExplorePage = () => {
  const [filter, setFilter] = useState<'spots' | 'routes'>('spots');

  return (
    <div className="pb-20">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-4 py-4 border-bottom border-zinc-100">
        <div className="flex bg-zinc-100 p-1 rounded-xl">
          <button 
            onClick={() => setFilter('spots')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${filter === 'spots' ? 'bg-white shadow-sm text-emerald-600' : 'text-zinc-500'}`}
          >
            最美景点
          </button>
          <button 
            onClick={() => setFilter('routes')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${filter === 'routes' ? 'bg-white shadow-sm text-emerald-600' : 'text-zinc-500'}`}
          >
            游玩攻略
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {filter === 'spots' ? (
          <>
            <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <div className="w-1 h-5 bg-emerald-500 rounded-full" />
                “三千文化”
              </h3>
              {SCENIC_SPOTS.filter(s => s.category === '3000').map(spot => (
                <div key={spot.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-zinc-100">
                  <img src={spot.image} alt={spot.name} className="w-full h-48 object-cover" referrerPolicy="no-referrer" />
                  <div className="p-4">
                    <h4 className="font-bold text-lg">{spot.name}</h4>
                    <p className="text-sm text-zinc-500 mt-1">{spot.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <div className="w-1 h-5 bg-orange-500 rounded-full" />
                勾蓝瑶寨
              </h3>
              {SCENIC_SPOTS.filter(s => s.category === 'goulan').map(spot => (
                <div key={spot.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-zinc-100">
                  <img src={spot.image} alt={spot.name} className="w-full h-48 object-cover" referrerPolicy="no-referrer" />
                  <div className="p-4">
                    <h4 className="font-bold text-lg">{spot.name}</h4>
                    <p className="text-sm text-zinc-500 mt-1">{spot.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {['瑶绣', '洗泥节', '瑶家女子拳'].map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-1 bg-orange-50 text-orange-600 rounded-full font-medium">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-6">
            {['culture', 'life', 'agri'].map(type => (
              <div key={type} className="space-y-4">
                <h3 className="text-lg font-bold capitalize">
                  {type === 'culture' ? '文化旅游精品线路' : type === 'life' ? '生活旅游精品路线' : '特香农业体验'}
                </h3>
                {ROUTES.filter(r => r.type === type).map(route => (
                  <div key={route.id} className="relative rounded-2xl overflow-hidden h-40 group">
                    <img src={route.image} alt={route.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end">
                      <h4 className="text-white font-bold">{route.title}</h4>
                      <p className="text-white/70 text-xs mt-1">{route.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ProductsPage = () => {
  const [filter, setFilter] = useState<'experience' | 'food'>('experience');

  return (
    <div className="pb-20">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-4 py-4 border-bottom border-zinc-100">
        <div className="flex bg-zinc-100 p-1 rounded-xl">
          <button 
            onClick={() => setFilter('experience')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${filter === 'experience' ? 'bg-white shadow-sm text-emerald-600' : 'text-zinc-500'}`}
          >
            旅游体验
          </button>
          <button 
            onClick={() => setFilter('food')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${filter === 'food' ? 'bg-white shadow-sm text-emerald-600' : 'text-zinc-500'}`}
          >
            特色美食
          </button>
        </div>
      </div>

      <div className="p-4 grid grid-cols-1 gap-4">
        {PRODUCTS.filter(p => p.type === filter).map(product => (
          <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-zinc-100 flex h-32">
            <img src={product.image} alt={product.name} className="w-32 h-full object-cover" referrerPolicy="no-referrer" />
            <div className="flex-1 p-3 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-zinc-900">{product.name}</h4>
                <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{product.description}</p>
                {product.schedule && (
                  <div className="text-[10px] text-emerald-600 mt-1 font-medium">{product.schedule}</div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-rose-500 font-bold">¥{product.price}</span>
                <button className="bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-full font-medium">立即预订</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DiningPage = () => {
  const [selectedRes, setSelectedRes] = useState<Restaurant | null>(null);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  const handleBooking = async (res: Restaurant) => {
    const res_api = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productName: res.name,
        phone: '13800138000',
        quantity: 1,
        totalPrice: 100
      })
    });
    const data = await res_api.json();
    setOrderSuccess(data.code);
  };

  return (
    <div className="pb-20">
      <SectionHeader title="餐饮预订" subtitle="发现江永地道风味" />
      
      <div className="px-4 space-y-4">
        {RESTAURANTS.map(res => (
          <div 
            key={res.id} 
            onClick={() => setSelectedRes(res)}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-zinc-100"
          >
            <div className="relative h-48">
              <img src={res.images[0]} alt={res.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold text-amber-500">
                <Star size={12} fill="currentColor" />
                {res.rating}
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg">{res.name}</h3>
                <span className="text-xs text-zinc-400">{res.priceRange}</span>
              </div>
              <p className="text-sm text-zinc-500 mt-1">{res.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Restaurant Detail Modal */}
      <AnimatePresence>
        {selectedRes && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="fixed inset-0 z-50 bg-white overflow-y-auto"
          >
            <div className="relative h-64">
              <img src={selectedRes.images[0]} alt={selectedRes.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <button 
                onClick={() => setSelectedRes(null)}
                className="absolute top-6 left-6 bg-black/20 backdrop-blur-md text-white p-2 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold">{selectedRes.name}</h2>
              <div className="flex items-center gap-4 mt-2 text-sm text-zinc-500">
                <span className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star size={14} fill="currentColor" /> {selectedRes.rating}
                </span>
                <span>{selectedRes.priceRange}</span>
                <span className="text-emerald-600">库存: {selectedRes.stock}</span>
              </div>
              
              <div className="mt-8">
                <h3 className="font-bold mb-4">特色菜品</h3>
                <div className="space-y-4">
                  {selectedRes.menu.map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-zinc-50 rounded-xl">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-rose-500 font-bold">¥{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-bold mb-4">游客评价</h3>
                <div className="space-y-4">
                  {[1, 2].map(i => (
                    <div key={i} className="border-b border-zinc-100 pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-zinc-200" />
                        <span className="text-xs font-medium text-zinc-700">游客_{i}234</span>
                      </div>
                      <p className="text-sm text-zinc-600">味道非常正宗，环境也很有特色，推荐！</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 p-4 bg-white border-t border-zinc-100">
              <button 
                onClick={() => handleBooking(selectedRes)}
                className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-600/20"
              >
                立即订购
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {orderSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <div className="bg-white rounded-3xl p-8 w-full max-w-xs text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">订购成功</h3>
              <p className="text-sm text-zinc-500 mb-6">请凭此消费码到店使用</p>
              <div className="bg-zinc-100 p-4 rounded-2xl font-mono text-2xl font-bold tracking-widest text-zinc-800 mb-6">
                {orderSuccess}
              </div>
              <button 
                onClick={() => setOrderSuccess(null)}
                className="w-full py-3 bg-zinc-900 text-white rounded-xl font-bold"
              >
                确定
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ComplaintPage = ({ onBack }: { onBack: () => void }) => {
  const [step, setStep] = useState<'flow' | 'form'>('flow');
  const [formData, setFormData] = useState({ name: '', phone: '', content: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await fetch('/api/complaints', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-8 text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <ChevronRight size={32} />
        </div>
        <h3 className="text-xl font-bold mb-2">投诉已受理</h3>
        <p className="text-sm text-zinc-500 mb-8">我们将尽快处理并给您反馈，感谢您的监督。</p>
        <button onClick={onBack} className="w-full py-3 bg-zinc-900 text-white rounded-xl font-bold">返回首页</button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-6">
        <button onClick={onBack} className="p-2 -ml-2"><X size={24} /></button>
        <h2 className="text-xl font-bold">在线投诉</h2>
      </div>

      {step === 'flow' ? (
        <div className="space-y-6">
          <div className="bg-zinc-50 p-6 rounded-2xl">
            <h3 className="font-bold mb-4">投诉处理流程</h3>
            <div className="space-y-4">
              {[
                { step: '01', title: '提交信息', desc: '填写您的联系方式及投诉内容' },
                { step: '02', title: '后台受理', desc: '管理员将在24小时内查收并受理' },
                { step: '03', title: '调查核实', desc: '相关部门对投诉情况进行核实' },
                { step: '04', title: '结果反馈', desc: '处理结果将通过短信或电话告知' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-emerald-600 font-mono font-bold">{item.step}</span>
                  <div>
                    <h4 className="text-sm font-bold">{item.title}</h4>
                    <p className="text-xs text-zinc-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex gap-3">
            <Phone size={20} className="text-amber-600 shrink-0" />
            <div>
              <p className="text-xs font-bold text-amber-900">投诉电话</p>
              <p className="text-sm text-amber-700">0746-1234567</p>
            </div>
          </div>
          <button 
            onClick={() => setStep('form')}
            className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold"
          >
            我要投诉
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">姓名</label>
            <input 
              required
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500"
              placeholder="请输入您的姓名"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">联系电话</label>
            <input 
              required
              type="tel"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500"
              placeholder="请输入您的联系电话"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">投诉内容</label>
            <textarea 
              required
              rows={5}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500"
              placeholder="请详细描述您遇到的问题"
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold mt-4"
          >
            提交投诉
          </button>
        </form>
      )}
    </div>
  );
};

const EncyclopediaPage = ({ onBack }: { onBack: () => void }) => (
  <div className="bg-white min-h-screen">
    <div className="relative h-64">
      <img src="https://picsum.photos/seed/encyclopedia/800/600" alt="Encyclopedia" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h2 className="text-3xl font-bold text-white tracking-widest">江永百科</h2>
      </div>
      <button onClick={onBack} className="absolute top-6 left-6 bg-white/20 backdrop-blur-md text-white p-2 rounded-full"><X size={20} /></button>
    </div>
    <div className="p-6 space-y-8">
      <section>
        <h3 className="text-lg font-bold text-emerald-600 mb-3 flex items-center gap-2">
          <div className="w-1 h-4 bg-emerald-600 rounded-full" />
          历史沿革
        </h3>
        <p className="text-sm text-zinc-600 leading-relaxed">{ENCYCLOPEDIA.history}</p>
      </section>
      <section>
        <h3 className="text-lg font-bold text-emerald-600 mb-3 flex items-center gap-2">
          <div className="w-1 h-4 bg-emerald-600 rounded-full" />
          生态环境
        </h3>
        <p className="text-sm text-zinc-600 leading-relaxed">{ENCYCLOPEDIA.ecology}</p>
      </section>
      <section>
        <h3 className="text-lg font-bold text-emerald-600 mb-3 flex items-center gap-2">
          <div className="w-1 h-4 bg-emerald-600 rounded-full" />
          名优特产
        </h3>
        <div className="flex flex-wrap gap-2">
          {ENCYCLOPEDIA.specialties.map(s => (
            <span key={s} className="px-3 py-1.5 bg-zinc-100 text-zinc-700 text-xs rounded-full font-medium">{s}</span>
          ))}
        </div>
      </section>
    </div>
  </div>
);

const MedicalRescuePage = ({ onBack }: { onBack: () => void }) => (
  <div className="p-6 bg-white min-h-screen">
    <div className="flex items-center gap-4 mb-8">
      <button onClick={onBack} className="p-2 bg-zinc-100 rounded-full"><X size={20} /></button>
      <h2 className="text-xl font-bold">医疗救援</h2>
    </div>
    <div className="space-y-6">
      <div className="bg-rose-50 p-6 rounded-[2rem] border border-rose-100">
        <div className="w-12 h-12 bg-rose-500 text-white rounded-2xl flex items-center justify-center mb-4">
          <Phone size={24} />
        </div>
        <h3 className="text-lg font-bold text-rose-900 mb-1">急救热线</h3>
        <p className="text-xs text-rose-600 mb-4">24小时全天候医疗紧急救援服务</p>
        <a href="tel:120" className="inline-block bg-rose-500 text-white px-6 py-3 rounded-xl font-bold text-lg">120</a>
      </div>
      <div className="space-y-4">
        <h3 className="font-bold text-zinc-900">定点医院</h3>
        {[
          { name: "江永县人民医院", address: "江永县永明东路", tel: "0746-1234567" },
          { name: "江永县中医院", address: "江永县永明西路", tel: "0746-7654321" },
        ].map((h, i) => (
          <div key={i} className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
            <h4 className="font-bold text-sm mb-1">{h.name}</h4>
            <p className="text-xs text-zinc-500 mb-2">{h.address}</p>
            <a href={`tel:${h.tel}`} className="text-xs text-emerald-600 font-bold">{h.tel}</a>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const BookingGuidePage = ({ onBack }: { onBack: () => void }) => (
  <div className="p-6 bg-white min-h-screen">
    <div className="flex items-center gap-4 mb-8">
      <button onClick={onBack} className="p-2 bg-zinc-100 rounded-full"><X size={20} /></button>
      <h2 className="text-xl font-bold">预订指南</h2>
    </div>
    <div className="space-y-6">
      {GUIDES.map((g, i) => (
        <div key={i} className="p-6 bg-zinc-50 rounded-[2rem] border border-zinc-100">
          <h3 className="font-bold text-zinc-900 mb-3 flex items-start gap-3">
            <span className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs shrink-0">{i+1}</span>
            {g.title}
          </h3>
          <p className="text-sm text-zinc-500 leading-relaxed pl-9">{g.content}</p>
        </div>
      ))}
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomePage setTab={setActiveTab} />;
      case 'explore': return <ExplorePage />;
      case 'products': return <ProductsPage />;
      case 'dining': return <DiningPage />;
      case 'complaint': return <ComplaintPage onBack={() => setActiveTab('home')} />;
      case 'encyclopedia': return <EncyclopediaPage onBack={() => setActiveTab('home')} />;
      case 'medical': return <MedicalRescuePage onBack={() => setActiveTab('home')} />;
      case 'guide': return <BookingGuidePage onBack={() => setActiveTab('home')} />;
      default: return <HomePage setTab={setActiveTab} />;
    }
  };

  const showNav = !['complaint', 'encyclopedia', 'medical', 'guide'].includes(activeTab);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 max-w-md mx-auto shadow-xl">
      <main className="min-h-screen">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      {showNav && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-lg border-t border-zinc-100 flex justify-around items-center px-2 py-1 z-40">
          <TabButton 
            active={activeTab === 'home'} 
            icon={HomeIcon} 
            label="首页" 
            onClick={() => setActiveTab('home')} 
          />
          <TabButton 
            active={activeTab === 'explore'} 
            icon={MapIcon} 
            label="游玩" 
            onClick={() => setActiveTab('explore')} 
          />
          <TabButton 
            active={activeTab === 'products'} 
            icon={ShoppingBag} 
            label="产品" 
            onClick={() => setActiveTab('products')} 
          />
          <TabButton 
            active={activeTab === 'dining'} 
            icon={Utensils} 
            label="餐饮" 
            onClick={() => setActiveTab('dining')} 
          />
        </nav>
      )}
    </div>
  );
}
