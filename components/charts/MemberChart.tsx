
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', members: 400 },
  { name: 'Feb', members: 300 },
  { name: 'Mar', members: 500 },
  { name: 'Apr', members: 450 },
  { name: 'May', members: 600 },
  { name: 'Jun', members: 800 },
  { name: 'Jul', members: 950 },
];

const MemberChart: React.FC = () => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis dataKey="name" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip 
            contentStyle={{ 
                backgroundColor: 'rgba(31, 41, 55, 0.8)', 
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '0.5rem'
            }}
            labelStyle={{ color: '#f3f4f6' }}
          />
          <Area type="monotone" dataKey="members" stroke="#8884d8" fillOpacity={1} fill="url(#colorMembers)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MemberChart;
   