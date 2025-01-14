'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2 } from 'lucide-react'

const semesters = [
  { id: '243', name: 'Fall 2024' },
  { id: '241', name: 'Spring 2024' },
  { id: '233', name: 'Fall 2023' },
  { id: '231', name: 'Spring 2023' },
  { id: '223', name: 'Fall 2022' },
  { id: '222', name: 'Summer 2022' },
  { id: '221', name: 'Spring 2022' },
  { id: '213', name: 'Fall 2021' },
  { id: '212', name: 'Summer 2021' },
  { id: '211', name: 'Spring 2021' },
  { id: '203', name: 'Fall 2020' },
  { id: '202', name: 'Summer 2020' },
  { id: '201', name: 'Spring 2020' },
  { id: '193', name: 'Fall 2019' },
  { id: '192', name: 'Summer 2019' },
  { id: '191', name: 'Spring 2019' },
  { id: '183', name: 'Fall 2018' },
  { id: '182', name: 'Summer 2018' },
  { id: '181', name: 'Spring 2018' },
  { id: '173', name: 'Fall 2017' },
  { id: '172', name: 'Summer 2017' },
  { id: '171', name: 'Spring 2017' },
  { id: '163', name: 'Fall 2016' },
  { id: '162', name: 'Summer 2016' },
  { id: '161', name: 'Spring 2016' },
  { id: '153', name: 'Fall 2015' },
  { id: '152', name: 'Summer 2015' },
  { id: '151', name: 'Spring 2015' },
  { id: '143', name: 'Fall 2014' },
  { id: '142', name: 'Summer 2014' },
  { id: '141', name: 'Spring 2014' },
  { id: '133', name: 'Fall 2013' },
  { id: '132', name: 'Summer 2013' },
  { id: '131', name: 'Spring 2013' },
];


export default function ResultChecker() {
  const [studentId, setStudentId] = useState('')
  const [semesterId, setSemesterId] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchResult = async () => {
    if (!studentId || !semesterId) {
      setError('Please enter a Student ID and select a Semester')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch(`/api/fetch-result?api=1&studentId=${studentId}&semesterId=${semesterId}`)
      const data = await response.json()
      console.log('API Response:', data) // Debug log
      setResult(data)
    } catch (err) {
      console.error('Error fetching result:', err) // Debug log
      setError('Failed to fetch results. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-4 mb-8">
        <Input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="Enter Student ID (e.g., 221-15-4755)"
          className="text-lg"
        />
        <Select onValueChange={setSemesterId} value={semesterId}>
          <SelectTrigger>
            <SelectValue placeholder="Select Semester" />
          </SelectTrigger>
          <SelectContent>
            {semesters.map((semester) => (
              <SelectItem key={semester.id} value={semester.id}>
                {semester.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
  onClick={fetchResult}
  disabled={loading}
  className={`w-full transition-all duration-300 ${
    loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 active:scale-95'
  }`}
>
  {loading ? (
    <div className="flex items-center justify-center space-x-2">
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/22n-GeOTIGxsYshZTAQEI9a8qQ47Jti56Z.gif"
        alt="Loading Animation"
        className="h-8 w-8 object-contain"
      />
      <span className="animate-pulse">Loading...</span>
    </div>
  ) : (
    'Check Result'
  )}
</Button>
<h4
  style={{
    fontFamily: 'Arial, sans-serif',
    fontSize: '1rem',
    color: '#555',
    textAlign: 'right', // Aligns text to the right
  }}
>
  by{' '}
  <a
    href="https://www.linkedin.com/in/saanik/"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      fontFamily: 'Courier New, monospace',
      fontStyle: 'italic',
      color: '#0077b5',
      textDecoration: 'none',
    }}
  >
    s_anik
  </a>
</h4>

      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-md p-4 mb-4">
          {error}
        </div>
      )}

      {result && result.length > 0 && (
  <Card>
    <CardHeader>
      <CardTitle>Result Details</CardTitle>
    </CardHeader>
    <CardContent>
      {/* Display studentId and cgpa at the top */}
      <div className="mb-4 p-4 border-b border-gray-300">
        <p><strong>Student ID:</strong> {result[0].studentId || "N/A"}</p>
        <p><strong>SGPA:</strong> {result[0].cgpa || "N/A"}</p>
      </div>
      
      <div className="mb-4 p-4 border rounded-lg bg-gray-200 flex justify-between">
        <p className="flex-1 text-center font-bold">Course Title</p>
        <p className="flex-1 text-center font-bold">Course Credit</p>
        <p className="flex-1 text-center font-bold">Course GPA</p>
      </div>
      {/* Display course details */}
      {result.map((item, index) => (
        <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-50 flex justify-between">
          <p className="flex-1 text-center">{item.courseTitle || "N/A"}</p>
          <p className="flex-1 text-center">{item.totalCredit || "N/A"}</p>
          <p className="flex-1 text-center">{item.pointEquivalent || "N/A"}</p>
        </div>

      ))}
    </CardContent>
  </Card>
)}
      {loading && (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-4">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/22n-GeOTIGxsYshZTAQEI9a8qQ47Jti56Z.gif"
              alt="Loading Animation"
              className="h-50 w-50 object-contain"
            />
             {/* <p className="text-lg">Fetching results...</p> */}
          </div>
        </div>
      )}
    </div>
  )
}

