"use client";

import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Shield,
  MessageSquare,
  Mic,
  Database,
  Bot,
  Settings,
} from "lucide-react";
import { AccessAwarePageNavigation } from "@/app/(sandbox)/components/access-aware-page-navigation";
import { SuspenseWrapper } from "../components/suspense-wrapper";

function AIServiceContent() {
  return (
    <div className="h-full flex flex-col w-full">
      <div className="p-3 sm:p-4 lg:p-6 border-b bg-card mt-4 sm:mt-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">
              AI Services
            </h1>
          </div>
          <Badge variant="secondary" className="text-xs sm:text-sm">
            AI Intelligence
          </Badge>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground">
          Comprehensive AI services including chat, speech processing, RAG, and
          authentication
        </p>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar">
        <div className="p-3 sm:p-4 lg:p-6 w-full max-w-full">
          <div className="grid gap-3 xs:gap-4 sm:gap-6">
            {/* Authentication */}
            <section>
              <div className="space-y-2">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Authentication
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>• Most endpoints require a JWT access token</p>
                    <p>
                      • Tokens are obtained via the Auth service:{" "}
                      <code className="bg-muted px-2 py-1 rounded">
                        POST /api/v1/auth/login/json
                      </code>
                    </p>
                    <p>• Include the token in the request header:</p>
                    <code className="bg-muted px-3 py-2 rounded block mt-2">
                      Authorization: Bearer &lt;your_jwt_token&gt;
                    </code>
                  </div>
                </div>
              </div>
            </section>

            {/* Auth Service */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                1. Auth Service
              </h2>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="default">POST</Badge>
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    /api/v1/auth/login/json
                  </code>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Authenticate a user and receive a JWT token.
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Request Body (JSON):</h4>
                    <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                      {`{
  "identifier": "user@example.com",
  "password": "your_password"
}`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Response:</h4>
                    <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                      {`{
  "access_token": "jwt_token_here",
  "token_type": "bearer"
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Speech Services */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Mic className="h-5 w-5" />
                2. Speech Services
              </h2>

              <div className="space-y-4">
                {/* Speech to Text */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="default">POST</Badge>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      /api/v1/ai/spitch/speech-to-text
                    </code>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Transcribe audio to text.
                  </p>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm">
                        <strong>Allowed audio formats:</strong> .wav, .mp3,
                        .flac
                      </p>
                      <p className="text-sm">
                        <strong>Supported languages:</strong> &apos;yo&apos;,
                        &apos;en&apos;, &apos;ha&apos;, &apos;ig&apos;,
                        &apos;am&apos;
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">
                        Request Body (form-data):
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-muted">
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Parameter
                              </th>
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Type
                              </th>
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Required
                              </th>
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Description
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                file
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                UploadFile
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                ✅
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Audio file (wav, mp3, flac)
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                language
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                str
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                ❌
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Language code. Default: en
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                model
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                str
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                ❌
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Transcription model. Default: mansa_v1
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Response:</h4>
                      <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                        {`{
  "text": "Transcribed text from the audio"
}`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Text to Speech */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="default">POST</Badge>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      /api/v1/ai/spitch/text-to-speech
                    </code>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Convert text to spoken audio (MP3).
                  </p>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm">
                        <strong>Supported languages:</strong> &apos;yo&apos;,
                        &apos;en&apos;, &apos;ha&apos;, &apos;ig&apos;,
                        &apos;am&apos;
                      </p>
                    </div>

                    {/* Available Voices */}
                    <div>
                      <h4 className="font-medium mb-2">Available Voices:</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-muted">
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Voice
                              </th>
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Language
                              </th>
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Voice Type
                              </th>
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Description
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                Sade
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Yoruba
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Feminine
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Energetic, but breezy
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                Funmi
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Yoruba
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Feminine
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Calm, can sometimes be fun
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                Segun
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Yoruba
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Masculine
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Vibrant, yet cool
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                Femi
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Yoruba
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Masculine
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Really fun guy to interact with
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                Hasan
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Hausa
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Masculine
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Loud and clear voice
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                Amina
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Hausa
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Feminine
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                A bit quiet and soft
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                Zainab
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Hausa
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Feminine
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Clear, loud voice
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                Aliyu
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Hausa
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Masculine
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Soft voice, cool tone
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                Obinna
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Igbo
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Masculine
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Loud and clear voice
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                Ngozi
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Igbo
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Feminine
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                A bit quiet and soft
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                Amara
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Igbo
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Feminine
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Clear, loud voice
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                Ebuka
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Igbo
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Masculine
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Soft voice, cool tone
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                John
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                English
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Masculine
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Loud and clear voice
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                Lucy
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                English
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Feminine
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Very clear voice
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                Lina
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                English
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Feminine
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Clear, loud voice
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                Jude
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                English
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Masculine
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Deep voice, smooth
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                Henry
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                English
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Masculine
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Soft voice, cool tone
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                Kani
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                English
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Feminine
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Soft voice, cool tone
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                Hana
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Amharic
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Feminine
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                -
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                Selam
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Amharic
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Masculine
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                -
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                Tesfaye
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Amharic
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Masculine
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                -
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                Tena
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Amharic
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Feminine
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                -
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">
                        Request Body (form-data):
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-muted">
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Parameter
                              </th>
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Type
                              </th>
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Required
                              </th>
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Description
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                text
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                str
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                ✅
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Text to convert
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                language
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                str
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                ❌
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Language code. Default: en
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                voice
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                str
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                ❌
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Voice style. Default: lina
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Response:</h4>
                      <p className="text-sm text-muted-foreground">
                        MP3 audio file.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Translate */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="default">POST</Badge>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      /api/v1/ai/spitch/translate
                    </code>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Translate text between languages.
                  </p>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">
                        Request Body (form-data):
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-muted">
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Parameter
                              </th>
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Type
                              </th>
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Required
                              </th>
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Description
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                text
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                str
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                ✅
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Text to translate
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                source
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                str
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                ❌
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Source language. Default: en
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                target
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                str
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                ❌
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Target language. Default: yo
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Response:</h4>
                      <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                        {`{
  "translation": "Translated text"
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* RAG Services */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Database className="h-5 w-5" />
                3. RAG (Retrieval-Augmented Generation) Services
              </h2>

              <div className="space-y-4">
                {/* RAG Query */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="default">POST</Badge>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      /api/v1/ai/rag/query
                    </code>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Query the RAG system to generate answers from uploaded
                    documents.
                  </p>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">Request Body (JSON):</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-muted">
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Parameter
                              </th>
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Type
                              </th>
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Required
                              </th>
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Description
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                query
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                str
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                ✅
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Text query
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                model_id
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                str
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                ❌
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                LLM model ID
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                system_prompt
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                str
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                ❌
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Custom system prompt
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Response:</h4>
                      <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                        {`{
  "answer": "The system-generated answer based on your query and documents."
}`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* RAG Upload */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="default">POST</Badge>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      /api/v1/ai/rag/upload
                    </code>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload documents (PDF only) for retrieval in RAG.
                  </p>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">
                        Request Body (form-data):
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-muted">
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Parameter
                              </th>
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Type
                              </th>
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Required
                              </th>
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Description
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                files
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                List[UploadFile]
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                ✅
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                List of PDF files
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Response:</h4>
                      <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                        {`{
  "status": "success",
  "uploaded_files": ["file1.pdf", "file2.pdf"]
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Chat Services */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                4. Chat Services
              </h2>

              <div className="space-y-4">
                {/* Chat */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="default">POST</Badge>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      /api/v1/ai/chat/
                    </code>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Send a message to the AI and receive a response.
                  </p>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">Request Body (JSON):</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-muted">
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Parameter
                              </th>
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Type
                              </th>
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Required
                              </th>
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Description
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                user_input
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                str
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                ✅
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                User message text
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                session_id
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                str
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                ❌
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Existing chat session ID (leave empty to start
                                new session)
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                model_id
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                str
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                ❌
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                AI model ID (defaults to platform default)
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                is_openai
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                bool
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                ❌
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                True to use OpenAI API; False to use internal
                                AI. Default: False
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                temperature
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                float
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                ❌
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Randomness of AI responses (0=deterministic,
                                1=creative). Default: 0.0
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                max_tokens
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                int
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                ❌
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Max tokens in AI response. Default: 2000
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                system_prompt
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                str
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                ❌
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Custom system prompt for AI behavior
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Response:</h4>
                      <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                        {`{
  "chat_messages": [
    {"role": "user", "content": "Hello!", "created_at": "2025-09-15T12:00:00"},
    {"role": "assistant", "content": "Hi there!", "created_at": "2025-09-15T12:00:01"}
  ],
  "session_id": "abc123",
  "is_openai": false
}`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Get Chat Session */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">GET</Badge>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      /api/v1/ai/chat/{`{session_id}`}/session
                    </code>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Retrieve the chat history for a specific session.
                  </p>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">Path Parameters:</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-muted">
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Parameter
                              </th>
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Type
                              </th>
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Required
                              </th>
                              <th className="border border-gray-300 px-2 py-1 text-left">
                                Description
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-gray-300 px-2 py-1">
                                session_id
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                str
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                ✅
                              </td>
                              <td className="border border-gray-300 px-2 py-1">
                                Session ID to fetch messages
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Response:</h4>
                      <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                        {`{
  "chat_messages": [
    {"role": "user", "content": "Hello!", "created_at": "2025-09-15T12:00:00"},
    {"role": "assistant", "content": "Hi there!", "created_at": "2025-09-15T12:00:01"}
  ],
  "session_id": "abc123",
  "is_openai": false
}`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Get All Sessions */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">GET</Badge>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      /api/v1/ai/chat/sessions/all
                    </code>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Retrieve all chat sessions for the current user.
                  </p>

                  <div>
                    <h4 className="font-medium mb-2">Response:</h4>
                    <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                      {`[
  {
    "id": "abc123",
    "user_id": "user1",
    "created_at": "2025-09-10T12:00:00",
    "messages": [...]
  },
  {
    "id": "def456",
    "user_id": "user1",
    "created_at": "2025-09-11T12:00:00",
    "messages": [...]
  }
]`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Models Service */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Bot className="h-5 w-5" />
                5. Models Services
              </h2>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary">GET</Badge>
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    /api/v1/ai/models/
                  </code>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Retrieve all available AI models.
                </p>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Behavior:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>
                        • Returns a list of all models from the Groq AI platform
                      </li>
                      <li>• No authentication required</li>
                      <li>
                        • Clients can use these model IDs for /chat/ requests
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Response:</h4>
                    <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
                      {`[
  {
    "id": "meta-llama/llama-4-maverick-17b-128e-instruct",
    "owned_by": "Meta",
    "active": true,
    "context_window": 131072,
    "max_completion_tokens": 8192
  }
]`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Notes:</h4>
                    <p className="text-sm text-muted-foreground">
                      The list is dynamic and may change as new models are added
                      or deprecated.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Summary Notes */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5" />✅ Summary Notes
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                  <h3 className="font-medium mb-2">File Formats</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Audio uploads: .wav, .mp3, .flac only</li>
                    <li>• Document uploads for RAG: .pdf only</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                  <h3 className="font-medium mb-2">Languages</h3>
                  <p className="text-sm">
                    Supported Spitch languages: &apos;yo&apos;, &apos;en&apos;,
                    &apos;ha&apos;, &apos;ig&apos;, &apos;am&apos;
                  </p>
                </div>

                <div className="border rounded-lg p-4 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
                  <h3 className="font-medium mb-2">Authentication</h3>
                  <p className="text-sm">
                    JWT token: Required for all endpoints except /models/
                  </p>
                </div>

                <div className="border rounded-lg p-4 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
                  <h3 className="font-medium mb-2">Error Handling</h3>
                  <p className="text-sm">
                    Error responses: Include HTTP status and detail message
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4 lg:p-6 border-t">
        <AccessAwarePageNavigation currentPath="/introduction/services/ai" />
      </div>
    </div>
  );
}

export default function AIServicePage() {
  return (
    <SuspenseWrapper>
      <AIServiceContent />
    </SuspenseWrapper>
  );
}
