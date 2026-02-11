function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="text-center py-12">
      {Icon && (
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center">
            <Icon className="w-10 h-10 text-gray-400" />
          </div>
        </div>
      )}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 mb-6">{description}</p>
      )}
      {action}
    </div>
  )
}

export default EmptyState
