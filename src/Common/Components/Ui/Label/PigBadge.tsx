const PigBadge = ({ color, label }: any) => {
  return (
    <span 
      className={`px-2.5 py-0.5 inline-block text-xs font-medium rounded-full border bg-${color}-100 border-transparent text-${color}-500 bg-${color}-500/20 border-transparent`}>
        {label}
    </span>
  )
}

export default PigBadge;