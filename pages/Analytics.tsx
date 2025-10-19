
import React from 'react';
import Card from '../components/Card';
import MemberChart from '../components/charts/MemberChart';

const Analytics: React.FC = () => {
    return (
        <div className="space-y-8">
            <Card title="Member Growth">
                <MemberChart />
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card title="Message Activity">
                    <div className="h-64 flex items-center justify-center text-gray-500">
                        Message activity chart coming soon...
                    </div>
                </Card>
                <Card title="Join/Leave Activity">
                    <div className="h-64 flex items-center justify-center text-gray-500">
                        Join/Leave activity chart coming soon...
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Analytics;
   