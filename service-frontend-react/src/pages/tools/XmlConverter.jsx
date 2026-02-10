import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import * as converterService from '../../services/converterService'
import Textarea from '../../components/forms/Textarea'
import Button from '../../components/ui/Button'
import Alert from '../../components/ui/Alert'
import Tabs from '../../components/ui/Tabs'

function XmlConverter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState(null)

  const xmlToJsonMutation = useMutation({
    mutationFn: converterService.xmlToJson,
    onSuccess: (data) => {
      setOutput(JSON.stringify(data, null, 2))
      setError(null)
    },
    onError: (err) => {
      setError(err.response?.data?.message || 'Erreur de conversion')
    },
  })

  const jsonToXmlMutation = useMutation({
    mutationFn: converterService.jsonToXml,
    onSuccess: (data) => {
      setOutput(data)
      setError(null)
    },
    onError: (err) => {
      setError(err.response?.data?.message || 'Erreur de conversion')
    },
  })

  const handleXmlToJson = () => {
    xmlToJsonMutation.mutate(input)
  }

  const handleJsonToXml = () => {
    try {
      const jsonData = JSON.parse(input)
      jsonToXmlMutation.mutate(jsonData)
    } catch (err) {
      setError('JSON invalide')
    }
  }

  return (
    <div className="py-8">
      <div className="container-custom">
        <h1 className="text-4xl font-bold mb-8">Convertisseur XML/JSON</h1>

        {error && (
          <Alert type="error" onClose={() => setError(null)} className="mb-6">
            {error}
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Entrée</h2>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={15}
                placeholder="Collez votre XML ou JSON ici..."
              />
              <div className="flex space-x-4 mt-4">
                <Button onClick={handleXmlToJson} fullWidth>
                  XML → JSON
                </Button>
                <Button onClick={handleJsonToXml} fullWidth>
                  JSON → XML
                </Button>
              </div>
            </div>
          </div>

          <div>
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Sortie</h2>
              <Textarea
                value={output}
                onChange={(e) => setOutput(e.target.value)}
                rows={15}
                placeholder="Le résultat apparaîtra ici..."
                readOnly
              />
              <Button
                onClick={() => navigator.clipboard.writeText(output)}
                fullWidth
                variant="outline"
                className="mt-4"
                disabled={!output}
              >
                Copier
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Tabs defaultTab={0}>
            <Tabs.Panel label="Exemples XML">
              <div className="card">
                <pre className="text-sm bg-gray-50 p-4 rounded overflow-x-auto">
{`<?xml version="1.0" encoding="UTF-8"?>
<meal>
  <name>Pizza Margherita</name>
  <price>12.99</price>
  <category>main</category>
</meal>`}
                </pre>
              </div>
            </Tabs.Panel>
            <Tabs.Panel label="Exemples JSON">
              <div className="card">
                <pre className="text-sm bg-gray-50 p-4 rounded overflow-x-auto">
{`{
  "meal": {
    "name": "Pizza Margherita",
    "price": 12.99,
    "category": "main"
  }
}`}
                </pre>
              </div>
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default XmlConverter
