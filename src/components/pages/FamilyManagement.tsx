import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface FamilyMember {
  id: string;
  name: string;
  phone: string;
  relation: string;
  createdAt: number; // 用於排序
}

// 電話格式驗證
const isValidPhone = (phone: string) => {
  const phoneRegex = /^(09\d{8}|0\d{1,2}-\d{6,8})$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// 格式化電話號碼
const formatPhone = (phone: string) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10 && cleaned.startsWith('09')) {
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
  }
  return phone;
};

const FamilyManagement: React.FC = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState<FamilyMember[]>(() => {
    // 從本地存儲讀取資料
    const saved = localStorage.getItem('familyMembers');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        name: '張大明',
        phone: '0912-345-678',
        relation: '父親',
        createdAt: Date.now()
      },
      {
        id: '2',
        name: '李小美',
        phone: '0923-456-789',
        relation: '女兒',
        createdAt: Date.now() - 1000
      }
    ];
  });

  const [isAdding, setIsAdding] = useState(false);
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    relation: ''
  });

  // 搜尋功能
  const [searchTerm, setSearchTerm] = useState('');
  // 排序方式
  const [sortBy, setSortBy] = useState<'name' | 'relation' | 'newest' | 'oldest'>('newest');

  // 保存到本地存儲
  useEffect(() => {
    localStorage.setItem('familyMembers', JSON.stringify(members));
  }, [members]);

  // 處理添加家人
  const handleAdd = () => {
    if (!formData.name || !formData.phone || !formData.relation) {
      alert('請填寫完整資料');
      return;
    }

    if (!isValidPhone(formData.phone)) {
      alert('請輸入正確的電話號碼格式');
      return;
    }

    const id = Date.now().toString();
    const formattedPhone = formatPhone(formData.phone);
    setMembers([
      ...members,
      { 
        ...formData, 
        id, 
        phone: formattedPhone,
        createdAt: Date.now()
      }
    ]);
    setIsAdding(false);
    setFormData({ name: '', phone: '', relation: '' });
  };

  // 處理編輯確認
  const handleEdit = () => {
    if (!editingMember || !formData.name || !formData.phone || !formData.relation) {
      alert('請填寫完整資料');
      return;
    }

    if (!isValidPhone(formData.phone)) {
      alert('請輸入正確的電話號碼格式');
      return;
    }

    const formattedPhone = formatPhone(formData.phone);
    setMembers(members.map(m => 
      m.id === editingMember.id 
        ? { ...formData, id: editingMember.id, phone: formattedPhone, createdAt: m.createdAt }
        : m
    ));
    setEditingMember(null);
    setFormData({ name: '', phone: '', relation: '' });
  };

  // 過濾和排序家人列表
  const filteredAndSortedMembers = members
    .filter(member => 
      member.name.includes(searchTerm) ||
      member.phone.includes(searchTerm) ||
      member.relation.includes(searchTerm)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'relation':
          return a.relation.localeCompare(b.relation);
        case 'newest':
          return b.createdAt - a.createdAt;
        case 'oldest':
          return a.createdAt - b.createdAt;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 標題區 */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-400 p-4 text-white">
        <div className="flex items-center gap-2">
          <button 
            className="p-2 hover:bg-blue-700 rounded-lg"
            onClick={() => navigate('/')}
          >
            ←
          </button>
          <h1 className="text-xl font-bold">家人管理</h1>
        </div>
      </header>

      {/* 主要內容 */}
      <div className="p-4">
        {/* 搜尋和排序 */}
        <div className="mb-4 space-y-2">
          <input
            type="text"
            placeholder="搜尋家人..."
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <select
            className="w-full p-2 border rounded"
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
          >
            <option value="newest">最新添加</option>
            <option value="oldest">最早添加</option>
            <option value="name">按姓名</option>
            <option value="relation">按關係</option>
          </select>
        </div>

        {!isAdding && !editingMember && (
          <button 
            className="w-full bg-blue-500 text-white p-3 rounded-lg mb-4 hover:bg-blue-600"
            onClick={() => setIsAdding(true)}
          >
            + 添加家人
          </button>
        )}

        {/* 添加/編輯表單 */}
        {(isAdding || editingMember) && (
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h3 className="font-bold mb-4">
              {isAdding ? '添加新家人' : '編輯家人資料'}
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="姓名"
                maxLength={20}
                className="w-full p-2 border rounded"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <input
                type="tel"
                placeholder="電話 (09xx-xxxxxx)"
                className="w-full p-2 border rounded"
                value={formData.phone}
                onChange={e => {
                  const value = e.target.value.replace(/[^\d-]/g, '');
                  setFormData({...formData, phone: value});
                }}
              />
              {formData.phone && !isValidPhone(formData.phone) && (
                <p className="text-red-500 text-sm">請輸入正確的手機號碼格式</p>
              )}
              <select
                className="w-full p-2 border rounded"
                value={formData.relation}
                onChange={e => setFormData({...formData, relation: e.target.value})}
              >
                <option value="">選擇關係</option>
                <option value="父親">父親</option>
                <option value="母親">母親</option>
                <option value="子女">子女</option>
                <option value="配偶">配偶</option>
                <option value="其他">其他</option>
              </select>
              <div className="flex gap-2 pt-3">
                <button 
                  className="flex-1 bg-gray-200 p-2 rounded hover:bg-gray-300"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingMember(null);
                    setFormData({ name: '', phone: '', relation: '' });
                  }}
                >
                  取消
                </button>
                <button 
                  className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  onClick={isAdding ? handleAdd : handleEdit}
                >
                  {isAdding ? '確認添加' : '確認修改'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 家人列表 */}
        <div className="space-y-4">
          {filteredAndSortedMembers.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              {searchTerm ? '找不到符合的家人' : '尚未添加家人'}
            </div>
          ) : (
            filteredAndSortedMembers.map(member => (
              <div 
                key={member.id} 
                className="bg-white p-4 rounded-lg shadow"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-gray-500">{member.relation}</p>
                    <p className="text-gray-600">{member.phone}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200"
                      onClick={() => window.location.href = `tel:${member.phone}`}
                    >
                      撥打電話
                    </button>
                    <button 
                      className="bg-green-100 text-green-600 px-4 py-2 rounded-lg hover:bg-green-200"
                      onClick={() => {
                        setEditingMember(member);
                        setFormData({
                          name: member.name,
                          phone: member.phone,
                          relation: member.relation
                        });
                      }}
                    >
                      編輯
                    </button>
                    <button 
                      className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200"
                      onClick={() => {
                        if (window.confirm('確定要刪除這位家人嗎？')) {
                          setMembers(members.filter(m => m.id !== member.id));
                        }
                      }}
                    >
                      刪除
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FamilyManagement;