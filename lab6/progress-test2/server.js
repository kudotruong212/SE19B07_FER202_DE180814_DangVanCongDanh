// server.js - JSON Server với middleware để test lỗi 402
const jsonServer = require('json-server');
const bodyParser = require('body-parser');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// QUAN TRỌNG: Body parser PHẢI được đặt TRƯỚC tất cả middleware khác
// Sử dụng body-parser với options đúng (json() không có extended, chỉ urlencoded() có)
server.use(bodyParser.json({ limit: '50mb' }));
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Middleware để log request body TRƯỚC khi json-server defaults chạy
server.use((req, res, next) => {
  if (req.method === 'POST' && req.url === '/payments') {
    console.log('\n🔍 DEBUG - After bodyParser, before json-server defaults:');
    console.log('📦 Body:', req.body);
    console.log('📦 Body type:', typeof req.body);
    console.log('📦 Body keys:', req.body ? Object.keys(req.body) : 'null');
    console.log('📦 Content-Type:', req.headers['content-type']);
  }
  next();
});

// Sau đó mới dùng middlewares mặc định của json-server
// LƯU Ý: json-server defaults có thể có body parser riêng, nhưng đã được parse ở trên
server.use(middlewares);

// Middleware để mock lỗi 402 khi amount > 10000000
// PHẢI đặt TRƯỚC router để intercept request TRƯỚC KHI nó đến router
server.use((req, res, next) => {
  // Chỉ xử lý POST request đến /payments
  const isPaymentPost = req.method === 'POST' && (
    req.path === '/payments' || 
    req.path === '/payments/' ||
    req.originalUrl === '/payments' ||
    req.originalUrl === '/payments/' ||
    req.url === '/payments' ||
    req.url === '/payments/'
  );
  
  if (!isPaymentPost) {
    return next();
  }

  try {
    console.log('\n' + '='.repeat(60));
    console.log('📥 POST /payments REQUEST RECEIVED');
    console.log('='.repeat(60));
    console.log('📍 Method:', req.method);
    console.log('📍 Path:', req.path);
    console.log('📍 Original URL:', req.originalUrl);
    console.log('📍 URL:', req.url);
    console.log('📦 Request body:', JSON.stringify(req.body, null, 2));
    console.log('📦 Request body type:', typeof req.body);
    console.log('📦 Request body keys:', req.body ? Object.keys(req.body) : 'null');
    console.log('📦 Content-Type:', req.headers['content-type']);
    
    // Kiểm tra xem body có tồn tại không
    // Kiểm tra cả null/undefined và empty object
    if (!req.body || req.body === null || req.body === undefined) {
      console.error('❌ ERROR: Request body is null or undefined!');
      console.error('❌ Body:', req.body);
      console.error('❌ Body type:', typeof req.body);
      console.error('❌ Content-Type:', req.headers['content-type']);
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Request body is required and must be valid JSON'
      });
    }
    
    // Kiểm tra xem body có phải là object rỗng không
    if (typeof req.body === 'object' && Object.keys(req.body).length === 0) {
      console.error('❌ ERROR: Request body is empty object!');
      console.error('❌ Body:', req.body);
      console.error('❌ Content-Type:', req.headers['content-type']);
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Request body cannot be empty'
      });
    }
    
    // Chuyển đổi amount thành số để so sánh
    const amount = req.body.amount ? Number(req.body.amount) : 0;
    console.log('💰 Amount:', amount);
    console.log('🔍 Amount type:', typeof amount);
    console.log('🔍 Amount is valid number?', !isNaN(amount) && amount > 0);
    console.log('🔍 Amount > 10,000,000?', amount > 10000000);
    
    // Test lỗi 402: Nếu amount > 10,000,000 VND thì trả về lỗi 402
    if (!isNaN(amount) && amount > 0 && amount > 10000000) {
      console.log('\n' + '❌'.repeat(30));
      console.log('❌ PAYMENT REJECTED - Amount too high!');
      console.log('❌'.repeat(30));
      console.log('💰 Amount:', amount, 'VND');
      console.log('🚫 Status: 402 (Payment Required)');
      console.log('📤 Response:', { error: 'Payment Required', message: 'Tài khoản không đủ tiền' });
      console.log('🛑 REQUEST STOPPED - Will NOT go to router');
      console.log('🛑 Payment will NOT be added to database');
      console.log('❌'.repeat(30) + '\n');
      
      return res.status(402).json({
        error: 'Payment Required',
        message: 'Tài khoản không đủ tiền'
      });
    }
    
    // Nếu amount <= 10,000,000, cho phép đi qua router
    console.log('\n' + '✅'.repeat(30));
    console.log('✅ PAYMENT ALLOWED - Amount is valid');
    console.log('✅'.repeat(30));
    console.log('💰 Amount:', amount, 'VND (<= 10,000,000)');
    console.log('✅ Forwarding to router...');
    console.log('✅ Payment will be added to database');
    console.log('✅'.repeat(30) + '\n');
    
    // Gọi next() để tiếp tục xử lý request với router
    next();
  } catch (error) {
    // Xử lý lỗi trong middleware
    console.error('\n❌ ERROR in middleware:', error);
    console.error('❌ Error message:', error.message);
    console.error('❌ Error stack:', error.stack);
    if (!res.headersSent) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message || 'Unknown error occurred'
      });
    }
  }
});

// Sử dụng router của json-server
server.use(router);

// Error handler cho toàn bộ server (phải đặt SAU router)
server.use((err, req, res, next) => {
  console.error('\n❌ SERVER ERROR:', err);
  console.error('❌ Error message:', err.message);
  console.error('❌ Error stack:', err.stack);
  if (!res.headersSent) {
    res.status(err.status || 500).json({
      error: err.message || 'Internal Server Error',
      message: err.message || 'Unknown error occurred'
    });
  }
});

server.listen(3001, () => {
  console.log('\n' + '🚀'.repeat(30));
  console.log('🚀 JSON Server is running on http://localhost:3001');
  console.log('🚀'.repeat(30));
  console.log('📝 Test lỗi 402: Tạo payment với amount > 10,000,000 VND');
  console.log('💡 Middleware sẽ trả về 402 khi amount > 10,000,000 VND');
  console.log('🛑 Payment sẽ KHÔNG được thêm vào database khi amount > 10,000,000');
  console.log('🚀'.repeat(30) + '\n');
});
