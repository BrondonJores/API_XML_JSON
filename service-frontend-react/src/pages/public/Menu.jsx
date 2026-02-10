import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import * as menuService from '../../services/menuService'
import MealGrid from '../../components/menu/MealGrid'
import CategoryFilter from '../../components/menu/CategoryFilter'
import SearchBar from '../../components/common/SearchBar'
import Pagination from '../../components/ui/Pagination'
import { DEFAULT_PAGE_SIZE } from '../../utils/constants'

function Menu() {
  const [filters, setFilters] = useState({
    category: 'all',
    search: '',
    page: 1,
    perPage: DEFAULT_PAGE_SIZE,
  })

  const { data, isLoading } = useQuery({
    queryKey: ['meals', filters],
    queryFn: () => menuService.getMeals(filters),
  })

  const handleCategoryChange = (category) => {
    setFilters({ ...filters, category, page: 1 })
  }

  const handleSearch = (search) => {
    setFilters({ ...filters, search, page: 1 })
  }

  const handlePageChange = (page) => {
    setFilters({ ...filters, page })
  }

  return (
    <div className="py-8">
      <div className="container-custom">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Notre Menu</h1>

        {/* Filtres */}
        <div className="mb-8 space-y-6">
          <SearchBar onSearch={handleSearch} placeholder="Rechercher un plat..." />
          <CategoryFilter selected={filters.category} onChange={handleCategoryChange} />
        </div>

        {/* Grille de plats */}
        <MealGrid meals={data?.data} loading={isLoading} />

        {/* Pagination */}
        {data?.pagination && data.pagination.totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={data.pagination.currentPage}
              totalPages={data.pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Menu
