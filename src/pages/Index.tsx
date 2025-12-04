import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    investment: '',
    message: ''
  });
  const { toast } = useToast();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'solution', 'technology', 'portfolio', 'investors', 'contacts'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email.includes('@')) {
      toast({
        title: 'Ошибка валидации',
        description: 'Пожалуйста, введите корректный email адрес',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Заявка отправлена!',
      description: 'Мы свяжемся с вами в ближайшее время',
    });

    setFormData({
      name: '',
      email: '',
      company: '',
      investment: '',
      message: ''
    });
  };

  const navItems = [
    { id: 'home', label: 'Главная' },
    { id: 'about', label: 'О стартапе' },
    { id: 'solution', label: 'Решение' },
    { id: 'technology', label: 'Технология' },
    { id: 'portfolio', label: 'Портфолио' },
    { id: 'investors', label: 'Инвесторам' },
    { id: 'contacts', label: 'Контакты' }
  ];

  const portfolioItems = [
    { title: 'AI-платформа для аналитики', metric: '500K+ пользователей', color: 'from-primary to-secondary' },
    { title: 'IoT решение для умного дома', metric: '15M$ ARR', color: 'from-secondary to-accent' },
    { title: 'Blockchain для финтеха', metric: '2B+ транзакций', color: 'from-accent to-primary' },
    { title: 'ML модель распознавания', metric: '99.8% точность', color: 'from-primary via-accent to-secondary' }
  ];

  const techFeatures = [
    { icon: 'Cpu', title: 'Квантовые вычисления', desc: 'Обработка данных в 1000x быстрее' },
    { icon: 'Network', title: 'Нейронные сети', desc: 'Самообучающиеся AI алгоритмы' },
    { icon: 'Shield', title: 'Безопасность', desc: 'Криптография нового поколения' },
    { icon: 'Zap', title: 'Масштабируемость', desc: 'От стартапа до enterprise' }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold gradient-text">InnovateTech</div>
            
            <button 
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Icon name={isMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>

            <div className="hidden lg:flex gap-6">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-all hover:text-primary ${
                    activeSection === item.id ? 'text-primary font-semibold' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden mt-4 flex flex-col gap-3 animate-fade-in">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left py-2 transition-all hover:text-primary ${
                    activeSection === item.id ? 'text-primary font-semibold' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="container mx-auto text-center animate-fade-in">
          <div className="inline-block mb-6 px-4 py-2 glass-effect rounded-full text-sm">
            🚀 Технологии будущего уже здесь
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
            Революция в технологиях
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Мы создаём инновационные решения, которые меняют индустрию и открывают новые возможности для бизнеса
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all animate-glow"
              onClick={() => scrollToSection('investors')}
            >
              Стать инвестором
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => scrollToSection('about')}
            >
              Узнать больше
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50M$', label: 'Привлечено' },
              { value: '2M+', label: 'Пользователей' },
              { value: '15', label: 'Стран' },
              { value: '300%', label: 'Рост YoY' }
            ].map((stat, i) => (
              <div key={i} className="glass-effect p-6 rounded-xl animate-scale-in">
                <div className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</div>
                <div className="text-muted-foreground mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="min-h-screen flex items-center py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">О стартапе</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Команда экспертов мирового уровня, создающая технологии завтрашнего дня
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="glass-effect p-8 hover:scale-105 transition-transform">
              <Icon name="Target" size={48} className="text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Наша миссия</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ускорить цифровую трансформацию через внедрение передовых AI и ML технологий. 
                Мы делаем сложные решения доступными для каждого бизнеса, от стартапов до корпораций.
              </p>
            </Card>

            <Card className="glass-effect p-8 hover:scale-105 transition-transform">
              <Icon name="Users" size={48} className="text-secondary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Команда</h3>
              <p className="text-muted-foreground leading-relaxed">
                Более 50 специалистов из ведущих технологических компаний мира. 
                Совокупный опыт команды — 200+ лет в разработке enterprise решений и AI систем.
              </p>
            </Card>

            <Card className="glass-effect p-8 hover:scale-105 transition-transform">
              <Icon name="Award" size={48} className="text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-4">Достижения</h3>
              <p className="text-muted-foreground leading-relaxed">
                5 патентов в области машинного обучения, победители TechCrunch Disrupt 2024, 
                3 награды за инновации от MIT Technology Review.
              </p>
            </Card>

            <Card className="glass-effect p-8 hover:scale-105 transition-transform">
              <Icon name="TrendingUp" size={48} className="text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Рост</h3>
              <p className="text-muted-foreground leading-relaxed">
                300% рост выручки год к году, расширение в 5 новых рынков за последний квартал. 
                Прогноз выхода на IPO — Q2 2026.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section id="solution" className="min-h-screen flex items-center py-20 px-4 gradient-bg">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Наше решение</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Комплексная платформа, объединяющая AI, Big Data и автоматизацию
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="glass-effect p-8 mb-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                  <Icon name="Brain" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Умная автоматизация</h3>
                  <p className="text-muted-foreground mb-4">
                    Наша AI-платформа автоматизирует сложные бизнес-процессы, снижая операционные издержки 
                    на 60% и повышая производительность в 3 раза. Система обучается на ваших данных и 
                    постоянно оптимизируется.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full glass-effect text-sm">NLP</span>
                    <span className="px-3 py-1 rounded-full glass-effect text-sm">Computer Vision</span>
                    <span className="px-3 py-1 rounded-full glass-effect text-sm">Predictive Analytics</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass-effect p-8 mb-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center flex-shrink-0">
                  <Icon name="Database" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Big Data обработка</h3>
                  <p className="text-muted-foreground mb-4">
                    Обрабатываем петабайты данных в реальном времени. Наша распределённая архитектура 
                    обеспечивает мгновенный анализ и прогнозирование, позволяя принимать решения на основе 
                    актуальной информации.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full glass-effect text-sm">Real-time Processing</span>
                    <span className="px-3 py-1 rounded-full glass-effect text-sm">Data Lakes</span>
                    <span className="px-3 py-1 rounded-full glass-effect text-sm">ETL Pipeline</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="glass-effect p-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
                  <Icon name="Workflow" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Интеграция без границ</h3>
                  <p className="text-muted-foreground mb-4">
                    REST API, GraphQL, WebSocket — интегрируйтесь с любыми системами за минуты. 
                    Готовые коннекторы для 200+ популярных сервисов. SDK для всех основных языков программирования.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full glass-effect text-sm">REST API</span>
                    <span className="px-3 py-1 rounded-full glass-effect text-sm">GraphQL</span>
                    <span className="px-3 py-1 rounded-full glass-effect text-sm">Webhooks</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="technology" className="min-h-screen flex items-center py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Технологии</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Стек передовых технологий для максимальной производительности
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {techFeatures.map((feature, i) => (
              <Card key={i} className="glass-effect p-6 hover:scale-105 transition-transform text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon name={feature.icon as any} size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </Card>
            ))}
          </div>

          <Card className="glass-effect p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">Технический стек</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-3 text-primary">Backend</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Python / TensorFlow</li>
                  <li>• Node.js / Express</li>
                  <li>• Kubernetes / Docker</li>
                  <li>• PostgreSQL / Redis</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-secondary">AI/ML</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• GPT-4 / Claude</li>
                  <li>• Custom Neural Nets</li>
                  <li>• PyTorch / JAX</li>
                  <li>• MLOps Pipeline</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-accent">Infrastructure</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• AWS / GCP</li>
                  <li>• CI/CD Automation</li>
                  <li>• Monitoring / Logs</li>
                  <li>• 99.99% Uptime</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="portfolio" className="min-h-screen flex items-center py-20 px-4 gradient-bg">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Портфолио</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Успешные проекты, которые изменили рынок
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
            {portfolioItems.map((item, i) => (
              <Card 
                key={i} 
                className="glass-effect overflow-hidden hover:scale-105 transition-all group cursor-pointer"
              >
                <div className={`h-48 bg-gradient-to-br ${item.color} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
                  </div>
                  <Icon name="Sparkles" size={64} className="relative z-10 animate-float" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <div className="text-2xl font-bold gradient-text">{item.metric}</div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg">
              Посмотреть все проекты
              <Icon name="ExternalLink" size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <section id="investors" className="min-h-screen flex items-center py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Инвесторам</h2>
            <p className="text-xl text-muted-foreground">
              Присоединяйтесь к революции в технологиях
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: 'DollarSign', title: '50M$ Series B', desc: 'Текущий раунд' },
              { icon: 'TrendingUp', title: '5x ROI', desc: 'Прогноз на 3 года' },
              { icon: 'Users', title: '20+ Investors', desc: 'Уже с нами' }
            ].map((item, i) => (
              <Card key={i} className="glass-effect p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon name={item.icon as any} size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </Card>
            ))}
          </div>

          <Card className="glass-effect p-8 animate-scale-in">
            <h3 className="text-2xl font-bold mb-6 text-center">Получить инвестиционный питч</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Имя *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="glass-effect border-white/10"
                    placeholder="Иван Иванов"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="glass-effect border-white/10"
                    placeholder="ivan@company.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Компания / Фонд</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="glass-effect border-white/10"
                    placeholder="Venture Capital Fund"
                  />
                </div>
                <div>
                  <Label htmlFor="investment">Интерес к инвестициям</Label>
                  <Input
                    id="investment"
                    value={formData.investment}
                    onChange={(e) => setFormData({...formData, investment: e.target.value})}
                    className="glass-effect border-white/10"
                    placeholder="$1M - $5M"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="message">Сообщение *</Label>
                <Textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="glass-effect border-white/10 min-h-[120px]"
                  placeholder="Расскажите о вашем интересе к проекту..."
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all"
                size="lg"
              >
                Отправить заявку
                <Icon name="Send" size={20} className="ml-2" />
              </Button>
            </form>
          </Card>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <Card className="glass-effect p-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Icon name="FileText" size={20} className="text-primary" />
                Документы для инвесторов
              </h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Инвестиционный меморандум (NDA)</li>
                <li>• Финансовая модель 2024-2027</li>
                <li>• Pitch Deck (обновлён Q4 2024)</li>
                <li>• Юридическая документация</li>
              </ul>
            </Card>

            <Card className="glass-effect p-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Icon name="Shield" size={20} className="text-secondary" />
                Защита инвестиций
              </h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Преимущественное право выкупа</li>
                <li>• Представительство в совете директоров</li>
                <li>• Ликвидационные преференции</li>
                <li>• Anti-dilution protection</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="min-h-screen flex items-center py-20 px-4 gradient-bg">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Контакты</h2>
            <p className="text-xl text-muted-foreground">
              Свяжитесь с нами любым удобным способом
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="glass-effect p-6 text-center hover:scale-105 transition-transform">
              <Icon name="Mail" size={32} className="mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Email</h3>
              <a href="mailto:invest@innovatetech.com" className="text-muted-foreground hover:text-primary transition-colors">
                invest@innovatetech.com
              </a>
            </Card>

            <Card className="glass-effect p-6 text-center hover:scale-105 transition-transform">
              <Icon name="Phone" size={32} className="mx-auto mb-4 text-secondary" />
              <h3 className="font-semibold mb-2">Телефон</h3>
              <a href="tel:+79991234567" className="text-muted-foreground hover:text-secondary transition-colors">
                +7 (999) 123-45-67
              </a>
            </Card>

            <Card className="glass-effect p-6 text-center hover:scale-105 transition-transform">
              <Icon name="MapPin" size={32} className="mx-auto mb-4 text-accent" />
              <h3 className="font-semibold mb-2">Офис</h3>
              <p className="text-muted-foreground">
                Москва, Сколково<br />
                Инновационный центр
              </p>
            </Card>
          </div>

          <Card className="glass-effect p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Форма обратной связи</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact-name">Имя *</Label>
                  <Input
                    id="contact-name"
                    required
                    className="glass-effect border-white/10"
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <Label htmlFor="contact-email">Email *</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    required
                    className="glass-effect border-white/10"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="contact-message">Сообщение *</Label>
                <Textarea
                  id="contact-message"
                  required
                  className="glass-effect border-white/10 min-h-[120px]"
                  placeholder="Ваше сообщение..."
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all"
                size="lg"
              >
                Отправить сообщение
                <Icon name="Send" size={20} className="ml-2" />
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <footer className="glass-effect py-12 px-4 mt-20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold gradient-text mb-4">InnovateTech</div>
              <p className="text-muted-foreground text-sm">
                Революционные технологии для бизнеса будущего
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Быстрые ссылки</h4>
              <div className="space-y-2">
                {navItems.slice(1).map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Социальные сети</h4>
              <div className="flex gap-4">
                {[
                  { icon: 'Linkedin', href: 'https://linkedin.com' },
                  { icon: 'Twitter', href: 'https://twitter.com' },
                  { icon: 'Github', href: 'https://github.com' },
                  { icon: 'Youtube', href: 'https://youtube.com' }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 glass-effect rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Icon name={social.icon as any} size={20} />
                  </a>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                <a href="tel:+79991234567" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                  <Icon name="Phone" size={16} />
                  +7 (999) 123-45-67
                </a>
                <a href="mailto:invest@innovatetech.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                  <Icon name="Mail" size={16} />
                  invest@innovatetech.com
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-muted-foreground text-sm">
            <p>© 2024 InnovateTech. Все права защищены.</p>
            <p className="mt-2">Создано с использованием передовых технологий AI и ML</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
