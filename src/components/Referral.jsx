import React, { useState } from 'react';

const Referral = ({ walletBalance, onAddWalletFunds }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [claimsCount, setClaimsCount] = useState(3);
  const [rewardsList, setRewardsList] = useState([
    { id: 'rew-1', name: 'Ayush Sharma', date: '2026-08-14', amount: 5.00, status: 'Credited' },
    { id: 'rew-2', name: 'Kunal Patel', date: '2026-08-15', amount: 5.00, status: 'Credited' },
    { id: 'rew-3', name: 'Rohan Deshmukh', date: '2026-08-17', amount: 5.00, status: 'Credited' }
  ]);

  const referralCode = "ZAPP-PANKAJ21";
  const referralLink = `https://zappdeal.com/ref/pankaj21`;

  const copyToClipboard = (text, setCopied) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const simulateNewReferral = () => {
    // Generate a mock referral
    const mockNames = ['Simran Kaur', 'Pooja Gupta', 'Amit Sen', 'Varun Rao'];
    const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
    const rewardAmt = 5.00;
    
    // Add to wallet balance
    onAddWalletFunds(rewardAmt);

    // Update referrals history list
    const newReward = {
      id: `rew-${Date.now()}`,
      name: randomName,
      date: new Date().toISOString().split('T')[0],
      amount: rewardAmt,
      status: 'Credited'
    };

    setRewardsList([newReward, ...rewardsList]);
    setClaimsCount(prev => prev + 1);
    alert(`🎉 Success! Simulated referral from ${randomName} has credited $5.00 to your wallet!`);
  };

  return (
    <div className="checkout-page-container" style={{ maxWidth: '800px' }}>
      <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '30px' }}>Refer & Earn Program</h2>

      <div className="checkout-box glass-panel" style={{ padding: '30px', textAlign: 'center', marginBottom: '24px' }}>
        <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>🎁</span>
        <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px' }}>Invite Friends, Earn Wallet Cash</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '500px', margin: '0 auto 24px', lineHeight: '1.6' }}>
          Share your referral code. When your friends buy their first premium case, they get **10% off** and you instantly get **$5.00** credited to your digital wallet!
        </p>

        {/* Earning Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', margin: '0 auto 24px', maxWidth: '550px' }}>
          <div className="glass-panel" style={{ padding: '16px' }}>
            <span style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Successful Refs</span>
            <strong style={{ fontSize: '20px', color: 'var(--primary)' }}>{claimsCount}</strong>
          </div>
          <div className="glass-panel" style={{ padding: '16px' }}>
            <span style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Total Earned</span>
            <strong style={{ fontSize: '20px', color: '#10b981' }}>${(claimsCount * 5.00).toFixed(2)}</strong>
          </div>
          <div className="glass-panel" style={{ padding: '16px' }}>
            <span style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Wallet Balance</span>
            <strong style={{ fontSize: '20px', color: 'var(--secondary)' }}>${walletBalance.toFixed(2)}</strong>
          </div>
        </div>

        {/* Copy boxes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '550px', margin: '0 auto 16px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              readOnly 
              value={referralCode} 
              className="form-input" 
              style={{ textAlign: 'center', fontWeight: '700', letterSpacing: '0.05em', marginBottom: 0 }}
            />
            <button 
              className="secondary-btn" 
              onClick={() => copyToClipboard(referralCode, setCopiedCode)}
              style={{ padding: '0 16px', minWidth: '120px' }}
            >
              {copiedCode ? 'Copied! ✓' : 'Copy Code'}
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              readOnly 
              value={referralLink} 
              className="form-input" 
              style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: 0 }}
            />
            <button 
              className="secondary-btn" 
              onClick={() => copyToClipboard(referralLink, setCopiedLink)}
              style={{ padding: '0 16px', minWidth: '120px' }}
            >
              {copiedLink ? 'Copied! ✓' : 'Copy Link'}
            </button>
          </div>
        </div>

        <button 
          className="neon-btn" 
          onClick={simulateNewReferral}
          style={{ padding: '10px 24px', fontSize: '14px', marginTop: '10px' }}
        >
          Simulate a Friend Referral (+$5.00)
        </button>
      </div>

      {/* How it works details */}
      <div className="checkout-box glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <h4 style={{ marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>How it works</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <strong style={{ color: 'var(--primary)' }}>1.</strong>
            <span>Send your custom referral invite code or link to your friends.</span>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <strong style={{ color: 'var(--primary)' }}>2.</strong>
            <span>Your friends apply your code at checkout and save 10% on their order.</span>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <strong style={{ color: 'var(--primary)' }}>3.</strong>
            <span>Once their order goes into processing, $5.00 is credited automatically to your Zapp Wallet! Use it to buy any cover for free.</span>
          </div>
        </div>
      </div>

      {/* Referrals list */}
      <div className="checkout-box glass-panel" style={{ padding: '24px' }}>
        <h4 style={{ marginBottom: '16px' }}>Referral Rewards History</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {rewardsList.map(item => (
            <div 
              key={item.id} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '12px 0', 
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                fontSize: '13px'
              }}
            >
              <div>
                <strong>{item.name}</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '11px', marginLeft: '12px' }}>{item.date}</span>
              </div>
              <span style={{ color: '#10b981', fontWeight: '700' }}>+${item.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Referral;
