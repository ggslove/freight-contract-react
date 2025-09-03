// 国际化语言配置
const translations = {
  zh: {
    // 通用
    common: {
      confirm: '确认',
      cancel: '取消',
      save: '保存',
      edit: '编辑',
      delete: '删除',
      add: '添加',
      search: '搜索',
      loading: '加载中...',
      noData: '暂无数据',
      actions: '操作',
      status: '状态',
      currency: '币种',
      amount: '金额',
      date: '日期',
      description: '描述',
      total: '总计',
      submit: '提交',
      reset: '重置',
      close: '关闭',
      yes: '是',
      no: '否',
      pleaseSelect: '请选择',
      pleaseInput: '请输入',
      required: '必填',
      optional: '选填',
      success: '成功',
      error: '错误',
      warning: '警告',
      info: '信息',
      enabled: '启用',
      disabled: '禁用'
    },

    // 导航
    navigation: {
      contracts: '合同管理',
      currencies: '币种管理',
      reports: '报表分析',
      settings: '系统设置',
      about: '关于系统'
    },
    
    // 应用
    app: {
      title: '货运合同系统'
    },
    
    // 导航菜单
    nav: {
      dashboard: '仪表盘',
      contracts: '合同管理',
      users: '用户管理',
      system: '系统管理',
      about: '关于',
      logout: '登出'
    },
    
    // 仪表盘
    dashboard: {
      overview: '合同业务概览',
      totalContracts: '有效合同总数',
      totalReceivables: '合同应收总额',
      totalPayables: '合同应付总额',
      netProfit: '合同净收益',
      startDate: '合同开始日期',
      endDate: '合同结束日期',
      thisMonth: '本月',
      lastMonth: '上月',
      dateRange: '合同开航日期范围内',
      latestContracts: '最新合同',
      receivablesPayables: '合同应收应付对比',
      recentContracts: '最近合同'
    },

    // 合同管理
    contractManagement: {
      title: '合同管理',
      subtitle: '统一管理合同相关业务和配置',
      contracts: '合同列表',
      currencies: '币种管理'
    },

    // 合同管理
    contracts: {
      title: '合同管理',
      subtitle: '管理您的货运合同和财务信息',
      addContract: '新增合同',
      editContract: '编辑合同',
      create: '创建',
      update: '更新',
      cancel: '取消',
      delete: '删除',
      contractNumber: '业务编号',
      billNumber: '提单号',
      invoiceNumber: '发票号',
      customer: '客户名称',
      salesman: '业务员',
      quantity: '数量',
      receiptDate: '收单日期',
      departureDate: '开航日期',
      taxNumber: '税号',
      totalReceivables: '应收总额',
      totalPayables: '应付总额',
      profit: '利润',
      receivables: '应收',
      payables: '应付',
      receivablesPayables: '应收应付明细',
      addReceivable: '添加应收',
      addPayable: '添加应付',
      addItem: '添加项目',
      itemDescription: '项目名称',
      itemAmount: '金额',
      itemCurrency: '币种',
      type: '类型',
      enterItemName: '输入项目名称',
      contractDetails: '合同详情',
      searchPlaceholder: '搜索业务编号、提单号、发票号或客户...',
      filterSalesman: '所有业务员',
      confirmDelete: '确定要删除此合同吗？',
      deleteSuccess: '合同删除成功',
      saveSuccess: '合同保存成功',
      addSuccess: '合同添加成功'
    },

    // 系统管理
    system: {
      title: '系统管理',
      description: '管理系统用户、角色和权限配置',
      userManagement: '用户管理',
      roleManagement: '角色管理',
      systemRoles: '系统角色',
      customRoles: '自定义角色',
      roleName: '角色名称',
      roleDescription: '角色描述',
      permissions: '权限列表',
      userCount: '用户数量',
      createTime: '创建时间',
      systemRole: '系统角色',
      customRole: '自定义角色',
      addRole: '添加角色',
      editRole: '编辑角色',
      deleteRole: '删除角色',
      confirmDeleteRole: '确定要删除该角色吗？',
      systemRoleCannotDelete: '系统预置角色不能删除',
      roleHasUsers: '该角色下还有用户，不能删除',
      roleNamePlaceholder: '请输入角色名称',
      roleDescPlaceholder: '请输入角色描述',
      selectPermissions: '请选择权限',
      saveSuccess: '角色保存成功',
      addSuccess: '角色添加成功',
      deleteSuccess: '角色删除成功'
    },
    
    // 关于页面
    about: {
      title: '货运合同管理系统',
      subtitle: '专业的货运合同管理解决方案',
      goals: '系统目标',
      goalsDescription: '为货运代理公司、船运公司、物流公司提供一站式的合同管理解决方案，简化合同处理流程，提高运营效率。',
      features: '核心功能',
      feature1: '合同信息完整管理',
      feature2: '多币种应收应付跟踪',
      feature3: '实时数据可视化',
      feature4: '智能搜索与筛选',
      targetUsers: '适用对象',
      freightForwarder: '货运代理公司',
      freightForwarderDesc: '管理客户合同和供应商付款',
      shippingCompany: '船运公司',
      shippingCompanyDesc: '跟踪运输合同和费用结算',
      logisticsCompany: '物流公司',
      logisticsCompanyDesc: '综合物流合同管理',
      systemFeatures: '系统特色',
      multiCurrency: '多币种支持',
      multiCurrencyDesc: '系统支持人民币、美元、欧元、英镑等多种主流货币，自动处理汇率转换和币种统计，满足国际货运业务需求。',
      realTimeVisualization: '实时数据可视化',
      realTimeVisualizationDesc: '通过直观的图表和仪表盘，实时展示合同数据、财务状态和趋势分析，帮助管理者快速掌握业务状况。',
      smartSearch: '智能搜索与筛选',
      smartSearchDesc: '强大的搜索功能和多维度筛选，支持按业务编号、客户名称、提单号等关键信息快速定位合同。',
      responsiveDesign: '响应式设计',
      responsiveDesignDesc: '采用现代化响应式设计，完美适配桌面端、平板和手机设备，随时随地管理合同信息。',
      techArchitecture: '技术架构',
      frontendTech: '前端技术',
      traditionalCSS: '传统CSS样式',
      dataVisualization: '数据可视化',
      coreFeatures: '核心功能',
      componentArchitecture: '组件化架构',
      stateManagement: '状态管理',
      routingManagement: '路由管理',
      systemSummary: '系统设计考虑了航运业务的复杂性和多样性，特别是多币种结算的需求，能够帮助企业更高效地管理货运合同和相关财务信息。'
    },

    // 登录
    login: {
      title: "登录",
      subtitle: "请使用您的账户登录系统",
      username: "用户名",
      password: "密码",
      usernamePlaceholder: "请输入用户名",
      passwordPlaceholder: "请输入密码",
      loginButton: "登录",
      loggingIn: "登录中...",
      loginSuccess: "登录成功",
      loginFailed: "登录失败",
      invalidCredentials: "用户名或密码错误",
      demoAccounts: "演示账号",
      adminAccount: "管理员账号",
      managerAccount: "业务经理账号",
      financeAccount: "财务人员账号",
      passwordHint: "密码"
    },

    // 用户管理
    users: {
      title: "用户管理",
      subtitle: "管理系统用户账户和权限",
      addUser: "添加用户",
      editUser: "编辑用户",
      totalUsers: "总用户数",
      enabledUsers: "启用用户",
      disabledUsers: "禁用用户",
      username: "用户名",
      realName: "真实姓名",
      email: "邮箱",
      phone: "手机号",
      role: "角色",
      status: "状态",
      createTime: "创建时间",
      createdAt: "创建时间",
      activeUsers: "活跃用户",
      lastLogin: "最后登录",
      actions: "操作",
      password: "密码",
      confirmPassword: "确认密码",
      selectRole: "请选择角色",
      confirmAdd: "确认添加",
      confirmEdit: "确认修改",
      confirmDelete: "确定要删除该用户吗？",
      passwordMismatch: "两次输入的密码不一致",
      systemAdmin: "系统管理员",
      superAdmin: "超级管理员",
      businessManager: "业务经理",
      financeStaff: "财务人员",
      normalUser: "普通用户",
      enabled: "启用",
      disabled: "禁用",
      zhangsan: "张三",
      lisi: "李四",
      totalUsersDesc: "系统中的总用户数",
      activeUsersDesc: "当前启用的用户数量",
      fetchUsersFailed: "获取用户列表失败",
      createUserFailed: "创建用户失败",
      createUserFailedEmpty: "创建用户失败：服务器返回空数据",
      updateUserFailed: "更新用户失败",
      updateUserFailedEmpty: "更新用户失败：服务器返回空数据",
      deleteUserFailed: "删除用户失败",
      updateUserStatusFailed: "更新用户状态失败"
    },

    // 币种管理
    currencies: {
      title: '币种管理',
      subtitle: '管理系统支持的币种和汇率配置',
      addCurrency: '添加币种',
      editCurrency: '编辑币种',
      currencyCode: '币种代码',
      currencyName: '币种名称',
      currencySymbol: '符号',
      totalCurrencies: '总币种数',
      activeCurrencies: '启用币种',
      statusActive: '启用',
      statusInactive: '禁用',
      confirmDelete: '确定要删除这个币种吗？',
      deleteSuccess: '币种删除成功',
      saveSuccess: '币种保存成功',
      addSuccess: '币种添加成功',
      codePlaceholder: '例如：CNY, USD',
      namePlaceholder: '例如：人民币, 美元',
      symbolPlaceholder: '例如：￥, $'
    },

    // Permissions
    permissions: {
      systemManagement: '系统管理',
      userManagement: '用户管理',
      roleManagement: '角色管理',
      contractManagement: '合同管理',
      financialManagement: '财务管理',
      currencyManagement: '币种管理',
      customerManagement: '客户管理',
      reportView: '报表查看',
      dataExport: '数据导出',
      systemConfiguration: '系统配置',
      contractCreate: '合同创建',
      contractEdit: '合同编辑',
      contractDelete: '合同删除',
      contractReview: '合同审核',
      paymentManagement: '付款管理',
      receiptManagement: '收款管理',
      invoiceManagement: '发票管理',
      statisticsAnalysis: '统计分析',
      logView: '日志查看'
    },

    // Status
    status: {
      pending: '待处理',
      processing: '处理中',
      completed: '已完成',
      cancelled: '已取消',
      draft: '草稿',
      active: '启用',
      inactive: '禁用'
    },

    // 币种
    currenciesList: {
      CNY: '人民币',
      USD: '美元',
      EUR: '欧元',
      GBP: '英镑',
      JPY: '日元'
    }
  },

  en: {
    // Common
    common: {
      confirm: 'Confirm',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      add: 'Add',
      search: 'Search',
      loading: 'Loading...',
      noData: 'No data',
      actions: 'Actions',
      status: 'Status',
      currency: 'Currency',
      amount: 'Amount',
      date: 'Date',
      description: 'Description',
      total: 'Total',
      submit: 'Submit',
      reset: 'Reset',
      close: 'Close',
      yes: 'Yes',
      no: 'No',
      pleaseSelect: 'Please select',
      pleaseInput: 'Please input',
      required: 'Required',
      optional: 'Optional',
      success: 'Success',
      error: 'Error',
      warning: 'Warning',
      info: 'Info',
      enabled: 'Enabled',
      disabled: 'Disabled'
    },

    // Navigation
    navigation: {
      contracts: 'Contracts',
      currencies: 'Currencies',
      reports: 'Reports',
      settings: 'Settings',
      about: 'About'
    },
    
    // App
    app: {
      title: 'Freight Contract System'
    },
    
    // Navigation Menu
    nav: {
      dashboard: 'Dashboard',
      contracts: 'Contracts',
      users: 'Users',
      system: 'System Management',
      about: 'About',
      logout: 'Logout'
    },
    
    // Dashboard
    dashboard: {
      overview: 'Contract Overview',
      totalContracts: 'Total Contracts',
      totalReceivables: 'Total Receivables',
      totalPayables: 'Total Payables',
      netProfit: 'Net Profit',
      startDate: 'Start Date',
      endDate: 'End Date',
      thisMonth: 'This Month',
      lastMonth: 'Last Month',
      dateRange: 'Within departure date range',
      latestContracts: 'Latest Contracts',
      receivablesPayables: 'Receivables vs Payables',
      recentContracts: 'Recent Contracts'
    },

    // Contract Management
    contractManagement: {
      title: 'Contract Management',
      subtitle: 'Unified management of contract-related business and configuration',
      contracts: 'Contract List',
      currencies: 'Currency Management'
    },

    // Contract Management
    contracts: {
      title: 'Contract Management',
      subtitle: 'Manage your freight contracts and financial information',
      addContract: 'Add Contract',
      editContract: 'Edit Contract',
      contractNumber: 'Contract Number',
      billNumber: 'Bill Number',
      invoiceNumber: 'Invoice Number',
      customer: 'Customer',
      salesman: 'Salesman',
      quantity: 'Quantity',
      currency: 'Currency',
      receiptDate: 'Receipt Date',
      departureDate: 'Departure Date',
      taxNumber: 'Tax Number',
      totalReceivables: 'Total Receivables',
      totalPayables: 'Total Payables',
      profit: 'Profit',
      create: 'Create',
      update: 'Update',
      cancel: 'Cancel',
      delete: 'Delete',
      receivables: 'Receivables',
      payables: 'Payables',
      receivablesPayables: 'Receivables & Payables',
      addReceivable: 'Add Receivable',
      addPayable: 'Add Payable',
      addItem: 'Add Item',
      itemDescription: 'Description',
      itemAmount: 'Amount',
      itemCurrency: 'Currency',
      type: 'Type',
      enterItemName: 'Enter item name',
      contractDetails: 'Contract Details',
      searchPlaceholder: 'Search contract number, bill number, invoice number or customer...',
      filterSalesman: 'All Salesmen',
      confirmDelete: 'Are you sure you want to delete this contract?',
      deleteSuccess: 'Contract deleted successfully',
      saveSuccess: 'Contract saved successfully',
      addSuccess: 'Contract added successfully'
    },

    // System Management
    system: {
      title: 'System Management',
      description: 'Manage system users, roles and permission configuration',
      userManagement: 'User Management',
      roleManagement: 'Role Management',
      systemRoles: 'System Roles',
      customRoles: 'Custom Roles',
      roleName: 'Role Name',
      roleDescription: 'Role Description',
      permissions: 'Permissions',
      userCount: 'User Count',
      createTime: 'Create Time',
      systemRole: 'System Role',
      customRole: 'Custom Role',
      addRole: 'Add Role',
      editRole: 'Edit Role',
      deleteRole: 'Delete Role',
      confirmDeleteRole: 'Are you sure you want to delete this role?',
      systemRoleCannotDelete: 'System preset roles cannot be deleted',
      roleHasUsers: 'Cannot delete role with users',
      roleNamePlaceholder: 'Please enter role name',
      roleDescPlaceholder: 'Please enter role description',
      selectPermissions: 'Please select permissions',
      saveSuccess: 'Role saved successfully',
      addSuccess: 'Role added successfully',
      deleteSuccess: 'Role deleted successfully'
    },
    
    // About Page
    about: {
      title: 'Freight Contract Management System',
      subtitle: 'Professional freight contract management solution',
      goals: 'System Goals',
      goalsDescription: 'Provide one-stop contract management solutions for freight forwarders, shipping companies, and logistics companies, simplifying contract processing workflows and improving operational efficiency.',
      features: 'Core Features',
      feature1: 'Complete contract information management',
      feature2: 'Multi-currency receivables and payables tracking',
      feature3: 'Real-time data visualization',
      feature4: 'Intelligent search and filtering',
      targetUsers: 'Target Users',
      freightForwarder: 'Freight Forwarders',
      freightForwarderDesc: 'Manage customer contracts and supplier payments',
      shippingCompany: 'Shipping Companies',
      shippingCompanyDesc: 'Track shipping contracts and expense settlements',
      logisticsCompany: 'Logistics Companies',
      logisticsCompanyDesc: 'Comprehensive logistics contract management',
      systemFeatures: 'System Features',
      multiCurrency: 'Multi-currency Support',
      multiCurrencyDesc: 'The system supports multiple mainstream currencies including CNY, USD, EUR, GBP, etc., automatically handles exchange rate conversion and currency statistics, meeting international freight business needs.',
      realTimeVisualization: 'Real-time Data Visualization',
      realTimeVisualizationDesc: 'Through intuitive charts and dashboards, real-time display of contract data, financial status and trend analysis helps managers quickly grasp business conditions.',
      smartSearch: 'Intelligent Search and Filtering',
      smartSearchDesc: 'Powerful search functionality and multi-dimensional filtering, supporting quick contract location by business number, customer name, bill of lading number and other key information.',
      responsiveDesign: 'Responsive Design',
      responsiveDesignDesc: 'Adopts modern responsive design, perfectly adapting to desktop, tablet and mobile devices, managing contract information anytime, anywhere.',
      techArchitecture: 'Technical Architecture',
      frontendTech: 'Frontend Technology',
      traditionalCSS: 'Traditional CSS Styles',
      dataVisualization: 'Data Visualization',
      coreFeatures: 'Core Features',
      componentArchitecture: 'Component Architecture',
      stateManagement: 'State Management',
      routingManagement: 'Routing Management',
      systemSummary: 'The system design considers the complexity and diversity of shipping business, especially the needs of multi-currency settlement, helping companies manage freight contracts and related financial information more efficiently.'
    },

    // Login
    login: {
      title: "Login",
      subtitle: "Please use your account to login to the system",
      username: "Username",
      password: "Password",
      usernamePlaceholder: "Please enter username",
      passwordPlaceholder: "Please enter password",
      loginButton: "Login",
      loggingIn: "Logging in...",
      loginSuccess: "Login successful",
      loginFailed: "Login failed",
      invalidCredentials: "Invalid username or password",
      demoAccounts: "Demo Accounts",
      adminAccount: "Administrator Account",
      managerAccount: "Business Manager Account",
      financeAccount: "Finance Staff Account",
      passwordHint: "Password"
    },

    // User Management
    users: {
      title: "User Management",
      subtitle: "Manage system user accounts and permissions",
      addUser: "Add User",
      editUser: "Edit User",
      totalUsers: "Total Users",
      enabledUsers: "Enabled Users",
      disabledUsers: "Disabled Users",
      username: "Username",
      realName: "Real Name",
      email: "Email",
      phone: "Phone Number",
      role: "Role",
      status: "Status",
      createTime: "Create Time",
      createdAt: "Create Time",
      activeUsers: "Active Users",
      lastLogin: "Last Login",
      actions: "Actions",
      password: "Password",
      confirmPassword: "Confirm Password",
      selectRole: "Please select role",
      confirmAdd: "Confirm Add",
      confirmEdit: "Confirm Edit",
      confirmDelete: "Are you sure you want to delete this user?",
      passwordMismatch: "Passwords do not match",
      systemAdmin: "System Administrator",
      superAdmin: "Super Administrator",
      businessManager: "Business Manager",
      financeStaff: "Finance Staff",
      normalUser: "Normal User",
      enabled: "Enabled",
      disabled: "Disabled",
      zhangsan: "Zhang San",
      lisi: "Li Si",
      totalUsersDesc: "Total number of users in the system",
      activeUsersDesc: "Number of currently enabled users",
      fetchUsersFailed: "Failed to fetch users",
      createUserFailed: "Failed to create user",
      createUserFailedEmpty: "Failed to create user: Server returned empty data",
      updateUserFailed: "Failed to update user",
      updateUserFailedEmpty: "Failed to update user: Server returned empty data",
      deleteUserFailed: "Failed to delete user",
      updateUserStatusFailed: "Failed to update user status"
    },

    // Currencies
    currencies: {
      title: 'Currency Management',
      subtitle: 'Manage supported currencies and exchange rate configuration',
      addCurrency: 'Add Currency',
      editCurrency: 'Edit Currency',
      currencyCode: 'Currency Code',
      currencyName: 'Currency Name',
      currencySymbol: 'Symbol',
      totalCurrencies: 'Total Currencies',
      activeCurrencies: 'Active Currencies',
      statusActive: 'Active',
      statusInactive: 'Inactive',
      confirmDelete: 'Are you sure you want to delete this currency?',
      deleteSuccess: 'Currency deleted successfully',
      saveSuccess: 'Currency saved successfully',
      addSuccess: 'Currency added successfully',
      codePlaceholder: 'e.g., CNY, USD',
      namePlaceholder: 'e.g., Chinese Yuan, US Dollar',
      symbolPlaceholder: 'e.g., ￥, $'
    },

    // Permissions
    permissions: {
      systemManagement: 'System Management',
      userManagement: 'User Management',
      roleManagement: 'Role Management',
      contractManagement: 'Contract Management',
      financialManagement: 'Financial Management',
      currencyManagement: 'Currency Management',
      customerManagement: 'Customer Management',
      reportView: 'Report View',
      dataExport: 'Data Export',
      systemConfiguration: 'System Configuration',
      contractCreate: 'Contract Create',
      contractEdit: 'Contract Edit',
      contractDelete: 'Contract Delete',
      contractReview: 'Contract Review',
      paymentManagement: 'Payment Management',
      receiptManagement: 'Receipt Management',
      invoiceManagement: 'Invoice Management',
      statisticsAnalysis: 'Statistics Analysis',
      logView: 'Log View'
    },

    // Permissions
    permissions: {
      systemManagement: 'Manajemen Sistem',
      userManagement: 'Manajemen Pengguna',
      roleManagement: 'Manajemen Peran',
      contractManagement: 'Manajemen Kontrak',
      financialManagement: 'Manajemen Keuangan',
      currencyManagement: 'Manajemen Mata Uang',
      customerManagement: 'Manajemen Pelanggan',
      reportView: 'Lihat Laporan',
      dataExport: 'Ekspor Data',
      systemConfiguration: 'Konfigurasi Sistem',
      contractCreate: 'Buat Kontrak',
      contractEdit: 'Edit Kontrak',
      contractDelete: 'Hapus Kontrak',
      contractReview: 'Tinjau Kontrak',
      paymentManagement: 'Manajemen Pembayaran',
      receiptManagement: 'Manajemen Penerimaan',
      invoiceManagement: 'Manajemen Faktur',
      statisticsAnalysis: 'Analisis Statistik',
      logView: 'Lihat Log'
    },

    // Status
    status: {
      pending: 'Pending',
      processing: 'Processing',
      completed: 'Completed',
      cancelled: 'Cancelled',
      draft: 'Draft',
      active: 'Active',
      inactive: 'Inactive'
    },

    // Currencies
    currenciesList: {
      CNY: 'Chinese Yuan',
      USD: 'US Dollar',
      EUR: 'Euro',
      GBP: 'British Pound',
      JPY: 'Japanese Yen'
    }
  },

  id: {
    // Umum
    common: {
      confirm: 'Konfirmasi',
      cancel: 'Batal',
      save: 'Simpan',
      edit: 'Edit',
      delete: 'Hapus',
      add: 'Tambah',
      search: 'Cari',
      loading: 'Memuat...',
      noData: 'Tidak ada data',
      actions: 'Aksi',
      status: 'Status',
      currency: 'Mata Uang',
      amount: 'Jumlah',
      date: 'Tanggal',
      description: 'Deskripsi',
      total: 'Total',
      submit: 'Kirim',
      reset: 'Reset',
      close: 'Tutup',
      yes: 'Ya',
      no: 'Tidak',
      pleaseSelect: 'Silakan pilih',
      pleaseInput: 'Silakan masukkan',
      required: 'Wajib',
      optional: 'Opsional',
      success: 'Sukses',
      error: 'Error',
      warning: 'Peringatan',
      info: 'Info',
      enabled: 'Aktif',
      disabled: 'Tidak Aktif'
    },

    // Navigasi
    navigation: {
      contracts: 'Kontrak',
      currencies: 'Mata Uang',
      reports: 'Laporan',
      settings: 'Pengaturan',
      about: 'Tentang'
    },
    
    // Aplikasi
    app: {
      title: 'Sistem Kontrak Pengiriman'
    },
    
    // Menu Navigasi
    nav: {
      dashboard: 'Dasbor',
      contracts: 'Kontrak',
      system: 'Manajemen Sistem',
      about: 'Tentang'
    },
    
    // Dasbor
    dashboard: {
      overview: 'Ringkasan Kontrak',
      totalContracts: 'Total Kontrak',
      totalReceivables: 'Total Piutang',
      totalPayables: 'Total Hutang',
      netProfit: 'Keuntungan Bersih',
      startDate: 'Tanggal Mulai',
      endDate: 'Tanggal Selesai',
      thisMonth: 'Bulan Ini',
      lastMonth: 'Bulan Lalu',
      dateRange: 'Dalam jangkauan tanggal keberangkatan',
      latestContracts: 'Kontrak Terbaru',
      receivablesPayables: 'Piutang vs Hutang',
      recentContracts: 'Kontrak Terbaru'
    },

    // Manajemen Kontrak
    contractManagement: {
      title: 'Manajemen Kontrak',
      subtitle: 'Kelola secara terpadu bisnis dan konfigurasi terkait kontrak',
      contracts: 'Daftar Kontrak',
      currencies: 'Manajemen Mata Uang'
    },

    // Kontrak
    contracts: {
      title: 'Manajemen Kontrak',
      subtitle: 'Kelola kontrak pengiriman dan informasi keuangan Anda',
      addContract: 'Tambah Kontrak',
      editContract: 'Edit Kontrak',
      contractNumber: 'Nomor Kontrak',
      billNumber: 'Nomor Bill',
      invoiceNumber: 'Nomor Faktur',
      customer: 'Pelanggan',
      salesman: 'Salesman',
      quantity: 'Kuantitas',
      currency: 'Mata Uang',
      receiptDate: 'Tanggal Penerimaan',
      departureDate: 'Tanggal Keberangkatan',
      taxNumber: 'Nomor Pajak',
      totalReceivables: 'Total Piutang',
      totalPayables: 'Total Hutang',
      profit: 'Keuntungan',
      receivables: 'Piutang',
      payables: 'Hutang',
      addReceivable: 'Tambah Piutang',
      addPayable: 'Tambah Hutang',
      itemDescription: 'Deskripsi Item',
      itemAmount: 'Jumlah',
      itemCurrency: 'Mata Uang',
      contractDetails: 'Detail Kontrak',
      searchPlaceholder: 'Cari nomor kontrak, nomor bill, nomor faktur atau pelanggan...',
      filterSalesman: 'Semua Sales',
      confirmDelete: 'Apakah Anda yakin ingin menghapus kontrak ini?',
      deleteSuccess: 'Kontrak berhasil dihapus',
      saveSuccess: 'Kontrak berhasil disimpan',
      addSuccess: 'Kontrak berhasil ditambahkan'
    },

    // Mata Uang
    currencies: {
      title: 'Manajemen Mata Uang',
      subtitle: 'Kelola konfigurasi mata uang dan kurs yang didukung',
      addCurrency: 'Tambah Mata Uang',
      editCurrency: 'Edit Mata Uang',
      currencyCode: 'Kode Mata Uang',
      currencyName: 'Nama Mata Uang',
      currencySymbol: 'Simbol',
      totalCurrencies: 'Total Mata Uang',
      activeCurrencies: 'Mata Uang Aktif',
      statusActive: 'Aktif',
      statusInactive: 'Tidak Aktif',
      confirmDelete: 'Apakah Anda yakin ingin menghapus mata uang ini?',
      deleteSuccess: 'Mata uang berhasil dihapus',
      saveSuccess: 'Mata uang berhasil disimpan',
      addSuccess: 'Mata uang berhasil ditambahkan',
      codePlaceholder: 'misalnya: CNY, USD',
      namePlaceholder: 'misalnya: Yuan China, Dolar AS',
      symbolPlaceholder: 'misalnya: ￥, $'
    },
    
    // Manajemen Sistem
    system: {
      title: 'Manajemen Sistem',
      description: 'Kelola pengguna sistem, peran dan konfigurasi izin',
      userManagement: 'Manajemen Pengguna',
      roleManagement: 'Manajemen Peran',
      systemRoles: 'Peran Sistem',
      customRoles: 'Peran Kustom',
      roleName: 'Nama Peran',
      roleDescription: 'Deskripsi Peran',
      permissions: 'Daftar Izin',
      userCount: 'Jumlah Pengguna',
      createTime: 'Waktu Pembuatan',
      systemRole: 'Peran Sistem',
      customRole: 'Peran Kustom',
      addRole: 'Tambah Peran',
      editRole: 'Edit Peran',
      deleteRole: 'Hapus Peran',
      confirmDeleteRole: 'Apakah Anda yakin ingin menghapus peran ini?',
      systemRoleCannotDelete: 'Peran preset sistem tidak dapat dihapus',
      roleHasUsers: 'Peran ini masih memiliki pengguna, tidak dapat dihapus',
      roleNamePlaceholder: 'Silakan masukkan nama peran',
      roleDescPlaceholder: 'Silakan masukkan deskripsi peran',
      selectPermissions: 'Silakan pilih izin',
      saveSuccess: 'Peran berhasil disimpan',
      addSuccess: 'Peran berhasil ditambahkan',
      deleteSuccess: 'Peran berhasil dihapus'
    },
    
    // Halaman Tentang
    about: {
      title: 'Sistem Manajemen Kontrak Pengiriman',
      subtitle: 'Solusi manajemen kontrak pengiriman profesional',
      goals: 'Tujuan Sistem',
      goalsDescription: 'Menyediakan solusi manajemen kontrak satu atap untuk pengusaha pengiriman, perusahaan pelayaran, dan perusahaan logistik, menyederhanakan alur kerja pemrosesan kontrak dan meningkatkan efisiensi operasional.',
      features: 'Fitur Utama',
      feature1: 'Manajemen informasi kontrak lengkap',
      feature2: 'Pelacakan piutang dan hutang multi-mata uang',
      feature3: 'Visualisasi data real-time',
      feature4: 'Pencarian dan penyaringan cerdas',
      targetUsers: 'Pengguna Target',
      freightForwarder: 'Pengusaha Pengiriman',
      freightForwarderDesc: 'Kelola kontrak pelanggan dan pembayaran pemasok',
      shippingCompany: 'Perusahaan Pelayaran',
      shippingCompanyDesc: 'Lacak kontrak pengiriman dan penyelesaian biaya',
      logisticsCompany: 'Perusahaan Logistik',
      logisticsCompanyDesc: 'Manajemen kontrak logistik komprehensif',
      systemFeatures: 'Fitur Sistem',
      multiCurrency: 'Dukungan Multi-mata Uang',
      multiCurrencyDesc: 'Sistem mendukung berbagai mata uang utama termasuk CNY, USD, EUR, GBP, dll., secara otomatis menangani konversi kurs dan statistik mata uang, memenuhi kebutuhan bisnis pengiriman internasional.',
      realTimeVisualization: 'Visualisasi Data Real-time',
      realTimeVisualizationDesc: 'Melalui grafik dan dasbor intuitif, menampilkan data kontrak, status keuangan dan analisis tren secara real-time membantu manajer dengan cepat memahami kondisi bisnis.',
      smartSearch: 'Pencarian dan Penyaringan Cerdas',
      smartSearchDesc: 'Fungsi pencarian yang kuat dan penyaringan multi-dimensi, mendukung penentuan kontrak cepat berdasarkan nomor bisnis, nama pelanggan, nomor bill of lading dan informasi kunci lainnya.',
      responsiveDesign: 'Desain Responsif',
      responsiveDesignDesc: 'Mengadopsi desain responsif modern, dengan sempurna menyesuaikan dengan perangkat desktop, tablet dan seluler, mengelola informasi kontrak kapan saja, di mana saja.',
      techArchitecture: 'Arsitektur Teknologi',
      frontendTech: 'Teknologi Frontend',
      traditionalCSS: 'Gaya CSS Tradisional',
      dataVisualization: 'Visualisasi Data',
      coreFeatures: 'Fitur Utama',
      componentArchitecture: 'Arsitektur Komponen',
      stateManagement: 'Manajemen Status',
      routingManagement: 'Manajemen Perutean',
      systemSummary: 'Desain sistem mempertimbangkan kompleksitas dan keragaman bisnis pengiriman, terutama kebutuhan penyelesaian multi-mata uang, membantu perusahaan mengelola kontrak pengiriman dan informasi keuangan terkait lebih efisien.'
    },

    // Login
    login: {
      title: "Masuk",
      subtitle: "Silakan gunakan akun Anda untuk masuk ke sistem",
      username: "Nama Pengguna",
      password: "Kata Sandi",
      usernamePlaceholder: "Silakan masukkan nama pengguna",
      passwordPlaceholder: "Silakan masukkan kata sandi",
      loginButton: "Masuk",
      loggingIn: "Sedang masuk...",
      loginSuccess: "Berhasil masuk",
      loginFailed: "Gagal masuk",
      invalidCredentials: "Nama pengguna atau kata sandi salah",
      demoAccounts: "Akun Demo",
      adminAccount: "Akun Administrator",
      managerAccount: "Akun Manajer Bisnis",
      financeAccount: "Akun Staf Keuangan",
      passwordHint: "Kata Sandi"
    },

    // Manajemen Pengguna
    users: {
      title: "Manajemen Pengguna",
      subtitle: "Kelola akun pengguna sistem dan izin",
      addUser: "Tambah Pengguna",
      editUser: "Edit Pengguna",
      totalUsers: "Total Pengguna",
      enabledUsers: "Pengguna Aktif",
      disabledUsers: "Pengguna Tidak Aktif",
      username: "Nama Pengguna",
      realName: "Nama Lengkap",
      email: "Email",
      phone: "Nomor Telepon",
      role: "Peran",
      status: "Status",
      createTime: "Waktu Pembuatan",
      createdAt: "Waktu Pembuatan",
      activeUsers: "Pengguna Aktif",
      lastLogin: "Login Terakhir",
      actions: "Aksi",
      password: "Kata Sandi",
      confirmPassword: "Konfirmasi Kata Sandi",
      selectRole: "Silakan pilih peran",
      confirmAdd: "Konfirmasi Tambah",
      confirmEdit: "Konfirmasi Edit",
      confirmDelete: "Apakah Anda yakin ingin menghapus pengguna ini?",
      passwordMismatch: "Kata sandi tidak cocok",
      systemAdmin: "Administrator Sistem",
      superAdmin: "Super Administrator",
      businessManager: "Manajer Bisnis",
      financeStaff: "Staf Keuangan",
      normalUser: "Pengguna Biasa",
      enabled: "Aktif",
      disabled: "Tidak Aktif",
      zhangsan: "Zhang San",
      lisi: "Li Si",
      totalUsersDesc: "Jumlah total pengguna dalam sistem",
      activeUsersDesc: "Jumlah pengguna yang saat ini aktif"
    },

    // Status
    status: {
      pending: 'Menunggu',
      processing: 'Diproses',
      completed: 'Selesai',
      cancelled: 'Dibatalkan',
      draft: 'Draft',
      active: 'Aktif',
      inactive: 'Tidak Aktif'
    },

    // Mata Uang
    currenciesList: {
      CNY: 'Yuan China',
      USD: 'Dolar AS',
      EUR: 'Euro',
      GBP: 'Pound Inggris',
      JPY: 'Yen Jepang'
    }
  }
};

// 当前语言状态
let currentLanguage = localStorage.getItem('language') || 'zh';

// 获取翻译
export const t = (key) => {
  const keys = key.split('.');
  let result = translations[currentLanguage];
  
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      // 如果找不到翻译，返回key本身
      return key;
    }
  }
  
  return result || key;
};

// 设置语言
export const setLanguage = (lang) => {
  if (translations[lang]) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
  }
};

// 获取当前语言
export const getCurrentLanguage = () => currentLanguage;

// 获取支持的语言列表
export const getSupportedLanguages = () => [
  { code: 'zh', name: '中文', nativeName: '中文' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'id', name: 'Indonesia', nativeName: 'Bahasa Indonesia' }
];

// 语言切换事件监听
export const onLanguageChange = (callback) => {
  window.addEventListener('languageChanged', (e) => callback(e.detail));
};

export default { t, setLanguage, getCurrentLanguage, getSupportedLanguages, onLanguageChange };