interface SectionHeaderProps {
  label: string;
  color: string;
}

export default function SectionHeader({ label, color }: SectionHeaderProps) {
  return (
    <div style={{
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color,
      padding: '12px 0 6px',
      borderBottom: `2px solid ${color}`,
      marginBottom: 10,
      marginTop: 16,
    }}>
      {label}
    </div>
  );
}
