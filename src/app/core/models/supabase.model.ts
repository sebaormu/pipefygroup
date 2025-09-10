export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      ai_agents: {
        Row: {
          agent_type: string
          created_at: string | null
          credits_per_use: number | null
          description: string | null
          id: number
          is_active: boolean | null
          model_config: Json | null
          name: string
          prompt_template: string | null
        }
        Insert: {
          agent_type: string
          created_at?: string | null
          credits_per_use?: number | null
          description?: string | null
          id?: number
          is_active?: boolean | null
          model_config?: Json | null
          name: string
          prompt_template?: string | null
        }
        Update: {
          agent_type?: string
          created_at?: string | null
          credits_per_use?: number | null
          description?: string | null
          id?: number
          is_active?: boolean | null
          model_config?: Json | null
          name?: string
          prompt_template?: string | null
        }
        Relationships: []
      }
      ai_generations: {
        Row: {
          completed_at: string | null
          created_at: string | null
          credits_used: number | null
          error_message: string | null
          generation_type: string
          id: number
          input_params: Json
          output_data: Json | null
          output_files: Json | null
          session_id: number | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          credits_used?: number | null
          error_message?: string | null
          generation_type: string
          id?: number
          input_params: Json
          output_data?: Json | null
          output_files?: Json | null
          session_id?: number | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          credits_used?: number | null
          error_message?: string | null
          generation_type?: string
          id?: number
          input_params?: Json
          output_data?: Json | null
          output_files?: Json | null
          session_id?: number | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_generations_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "ai_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_generations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_interactions: {
        Row: {
          ai_metadata: Json | null
          ai_response: string | null
          created_at: string | null
          credits_used: number | null
          id: number
          processing_time_ms: number | null
          session_id: number | null
          user_input: string | null
        }
        Insert: {
          ai_metadata?: Json | null
          ai_response?: string | null
          created_at?: string | null
          credits_used?: number | null
          id?: number
          processing_time_ms?: number | null
          session_id?: number | null
          user_input?: string | null
        }
        Update: {
          ai_metadata?: Json | null
          ai_response?: string | null
          created_at?: string | null
          credits_used?: number | null
          id?: number
          processing_time_ms?: number | null
          session_id?: number | null
          user_input?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_interactions_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "ai_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_sessions: {
        Row: {
          agent_id: number | null
          context: Json | null
          created_at: string | null
          ended_at: string | null
          id: number
          session_token: string | null
          started_at: string | null
          status: string | null
          total_credits_used: number | null
          user_id: string | null
        }
        Insert: {
          agent_id?: number | null
          context?: Json | null
          created_at?: string | null
          ended_at?: string | null
          id?: number
          session_token?: string | null
          started_at?: string | null
          status?: string | null
          total_credits_used?: number | null
          user_id?: string | null
        }
        Update: {
          agent_id?: number | null
          context?: Json | null
          created_at?: string | null
          ended_at?: string | null
          id?: number
          session_token?: string | null
          started_at?: string | null
          status?: string | null
          total_credits_used?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_sessions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "ai_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      credit_usage: {
        Row: {
          created_at: string | null
          credits_used: number
          id: number
          service_details: Json | null
          service_type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          credits_used: number
          id?: number
          service_details?: Json | null
          service_type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          credits_used?: number
          id?: number
          service_details?: Json | null
          service_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "credit_usage_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_methods: {
        Row: {
          brand: string | null
          created_at: string | null
          exp_month: number | null
          exp_year: number | null
          id: number
          is_default: boolean | null
          last4: string | null
          stripe_payment_method_id: string | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          brand?: string | null
          created_at?: string | null
          exp_month?: number | null
          exp_year?: number | null
          id?: number
          is_default?: boolean | null
          last4?: string | null
          stripe_payment_method_id?: string | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          brand?: string | null
          created_at?: string | null
          exp_month?: number | null
          exp_year?: number | null
          id?: number
          is_default?: boolean | null
          last4?: string | null
          stripe_payment_method_id?: string | null
          type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_methods_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          ai_credits_monthly: number
          created_at: string | null
          description: string | null
          features: Json | null
          id: number
          is_active: boolean | null
          max_products: number | null
          max_stores: number | null
          name: string
          price_monthly: number
          price_yearly: number
          priority_support: boolean | null
          sort_order: number | null
          stripe_price_id_monthly: string | null
          stripe_price_id_yearly: string | null
          updated_at: string | null
        }
        Insert: {
          ai_credits_monthly?: number
          created_at?: string | null
          description?: string | null
          features?: Json | null
          id?: number
          is_active?: boolean | null
          max_products?: number | null
          max_stores?: number | null
          name: string
          price_monthly: number
          price_yearly: number
          priority_support?: boolean | null
          sort_order?: number | null
          stripe_price_id_monthly?: string | null
          stripe_price_id_yearly?: string | null
          updated_at?: string | null
        }
        Update: {
          ai_credits_monthly?: number
          created_at?: string | null
          description?: string | null
          features?: Json | null
          id?: number
          is_active?: boolean | null
          max_products?: number | null
          max_stores?: number | null
          name?: string
          price_monthly?: number
          price_yearly?: number
          priority_support?: boolean | null
          sort_order?: number | null
          stripe_price_id_monthly?: string | null
          stripe_price_id_yearly?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      product_collections: {
        Row: {
          created_at: string | null
          description: string | null
          handle: string | null
          id: number
          import_status: string | null
          imported_at: string | null
          name: string
          products_count: number | null
          shopify_collection_id: number | null
          store_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          handle?: string | null
          id?: number
          import_status?: string | null
          imported_at?: string | null
          name: string
          products_count?: number | null
          shopify_collection_id?: number | null
          store_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          handle?: string | null
          id?: number
          import_status?: string | null
          imported_at?: string | null
          name?: string
          products_count?: number | null
          shopify_collection_id?: number | null
          store_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_collections_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "shopify_stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_collections_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          collection_id: number | null
          compare_at_price: number | null
          created_at: string | null
          description: string | null
          handle: string | null
          id: number
          images: Json | null
          price: number | null
          product_type: string | null
          shopify_product_id: number | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          variants: Json | null
          vendor: string | null
        }
        Insert: {
          collection_id?: number | null
          compare_at_price?: number | null
          created_at?: string | null
          description?: string | null
          handle?: string | null
          id?: number
          images?: Json | null
          price?: number | null
          product_type?: string | null
          shopify_product_id?: number | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          variants?: Json | null
          vendor?: string | null
        }
        Update: {
          collection_id?: number | null
          compare_at_price?: number | null
          created_at?: string | null
          description?: string | null
          handle?: string | null
          id?: number
          images?: Json | null
          price?: number | null
          product_type?: string | null
          shopify_product_id?: number | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          variants?: Json | null
          vendor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "product_collections"
            referencedColumns: ["id"]
          },
        ]
      }
      resources: {
        Row: {
          category: string | null
          content_type: string | null
          content_url: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          duration_minutes: number | null
          id: number
          is_premium: boolean | null
          is_published: boolean | null
          required_plan_id: number | null
          sort_order: number | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          video_url: string | null
          view_count: number | null
        }
        Insert: {
          category?: string | null
          content_type?: string | null
          content_url?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: number
          is_premium?: boolean | null
          is_published?: boolean | null
          required_plan_id?: number | null
          sort_order?: number | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          video_url?: string | null
          view_count?: number | null
        }
        Update: {
          category?: string | null
          content_type?: string | null
          content_url?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: number
          is_premium?: boolean | null
          is_published?: boolean | null
          required_plan_id?: number | null
          sort_order?: number | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          video_url?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "resources_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resources_required_plan_id_fkey"
            columns: ["required_plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
          permissions: Json | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
          permissions?: Json | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
          permissions?: Json | null
        }
        Relationships: []
      }
      shopify_stores: {
        Row: {
          access_token: string | null
          created_at: string | null
          currency: string | null
          id: number
          is_active: boolean | null
          last_sync_at: string | null
          plan_name: string | null
          shop_domain: string
          shop_email: string | null
          shop_name: string | null
          timezone: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          access_token?: string | null
          created_at?: string | null
          currency?: string | null
          id?: number
          is_active?: boolean | null
          last_sync_at?: string | null
          plan_name?: string | null
          shop_domain: string
          shop_email?: string | null
          shop_name?: string | null
          timezone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          access_token?: string | null
          created_at?: string | null
          currency?: string | null
          id?: number
          is_active?: boolean | null
          last_sync_at?: string | null
          plan_name?: string | null
          shop_domain?: string
          shop_email?: string | null
          shop_name?: string | null
          timezone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shopify_stores_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          billing_cycle: string | null
          cancel_at_period_end: boolean | null
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: number
          plan_id: number | null
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          trial_end: string | null
          trial_start: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          billing_cycle?: string | null
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: number
          plan_id?: number | null
          status: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          trial_start?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          billing_cycle?: string | null
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: number
          plan_id?: number | null
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          trial_start?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      support_conversations: {
        Row: {
          assigned_to: string | null
          category: string | null
          created_at: string | null
          id: number
          is_ai_handled: boolean | null
          priority: string | null
          resolved_at: string | null
          satisfaction_rating: number | null
          status: string | null
          subject: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          category?: string | null
          created_at?: string | null
          id?: number
          is_ai_handled?: boolean | null
          priority?: string | null
          resolved_at?: string | null
          satisfaction_rating?: number | null
          status?: string | null
          subject?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          category?: string | null
          created_at?: string | null
          id?: number
          is_ai_handled?: boolean | null
          priority?: string | null
          resolved_at?: string | null
          satisfaction_rating?: number | null
          status?: string | null
          subject?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_conversations_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      support_messages: {
        Row: {
          ai_confidence: number | null
          ai_model_used: string | null
          attachments: Json | null
          conversation_id: number | null
          created_at: string | null
          id: number
          message: string
          sender_id: string | null
          sender_type: string | null
        }
        Insert: {
          ai_confidence?: number | null
          ai_model_used?: string | null
          attachments?: Json | null
          conversation_id?: number | null
          created_at?: string | null
          id?: number
          message: string
          sender_id?: string | null
          sender_type?: string | null
        }
        Update: {
          ai_confidence?: number | null
          ai_model_used?: string | null
          attachments?: Json | null
          conversation_id?: number | null
          created_at?: string | null
          id?: number
          message?: string
          sender_id?: string | null
          sender_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "support_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      template_categories: {
        Row: {
          description: string | null
          id: number
          is_active: boolean | null
          name: string
          parent_id: number | null
          slug: string | null
          sort_order: number | null
        }
        Insert: {
          description?: string | null
          id?: number
          is_active?: boolean | null
          name: string
          parent_id?: number | null
          slug?: string | null
          sort_order?: number | null
        }
        Update: {
          description?: string | null
          id?: number
          is_active?: boolean | null
          name?: string
          parent_id?: number | null
          slug?: string | null
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "template_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "template_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      template_downloads: {
        Row: {
          created_at: string | null
          download_url: string | null
          downloaded_at: string | null
          expires_at: string | null
          id: number
          template_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          download_url?: string | null
          downloaded_at?: string | null
          expires_at?: string | null
          id?: number
          template_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          download_url?: string | null
          downloaded_at?: string | null
          expires_at?: string | null
          id?: number
          template_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "template_downloads_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "template_downloads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      templates: {
        Row: {
          category_id: number | null
          created_at: string | null
          created_by: string | null
          demo_url: string | null
          description: string | null
          downloads_count: number | null
          features: Json | null
          id: number
          is_active: boolean | null
          is_premium: boolean | null
          name: string
          preview_image_url: string | null
          preview_images: Json | null
          rating: number | null
          required_plan_id: number | null
          shopify_version: string | null
          tags: string[] | null
          updated_at: string | null
          zip_file_url: string
        }
        Insert: {
          category_id?: number | null
          created_at?: string | null
          created_by?: string | null
          demo_url?: string | null
          description?: string | null
          downloads_count?: number | null
          features?: Json | null
          id?: number
          is_active?: boolean | null
          is_premium?: boolean | null
          name: string
          preview_image_url?: string | null
          preview_images?: Json | null
          rating?: number | null
          required_plan_id?: number | null
          shopify_version?: string | null
          tags?: string[] | null
          updated_at?: string | null
          zip_file_url: string
        }
        Update: {
          category_id?: number | null
          created_at?: string | null
          created_by?: string | null
          demo_url?: string | null
          description?: string | null
          downloads_count?: number | null
          features?: Json | null
          id?: number
          is_active?: boolean | null
          is_premium?: boolean | null
          name?: string
          preview_image_url?: string | null
          preview_images?: Json | null
          rating?: number | null
          required_plan_id?: number | null
          shopify_version?: string | null
          tags?: string[] | null
          updated_at?: string | null
          zip_file_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "templates_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "template_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "templates_required_plan_id_fkey"
            columns: ["required_plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          description: string | null
          id: number
          metadata: Json | null
          processed_at: string | null
          status: string
          stripe_invoice_id: string | null
          stripe_payment_intent_id: string | null
          subscription_id: number | null
          transaction_type: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: number
          metadata?: Json | null
          processed_at?: string | null
          status: string
          stripe_invoice_id?: string | null
          stripe_payment_intent_id?: string | null
          subscription_id?: number | null
          transaction_type: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: number
          metadata?: Json | null
          processed_at?: string | null
          status?: string
          stripe_invoice_id?: string | null
          stripe_payment_intent_id?: string | null
          subscription_id?: number | null
          transaction_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_credits: {
        Row: {
          created_at: string | null
          credits_available: number | null
          credits_purchased: number | null
          credits_used: number | null
          id: number
          last_reset_at: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          credits_available?: number | null
          credits_purchased?: number | null
          credits_used?: number | null
          id?: number
          last_reset_at?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          credits_available?: number | null
          credits_purchased?: number | null
          credits_used?: number | null
          id?: number
          last_reset_at?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_credits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_resource_progress: {
        Row: {
          completed_at: string | null
          id: number
          last_accessed_at: string | null
          progress_percentage: number | null
          resource_id: number | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          id?: number
          last_accessed_at?: string | null
          progress_percentage?: number | null
          resource_id?: number | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          id?: number
          last_accessed_at?: string | null
          progress_percentage?: number | null
          resource_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_resource_progress_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_resource_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          id: number
          role_id: number | null
          user_id: string | null
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: number
          role_id?: number | null
          user_id?: string | null
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: number
          role_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          country_code: string | null
          created_at: string | null
          email: string
          email_verified_at: string | null
          full_name: string | null
          id: string
          language: string | null
          last_login_at: string | null
          phone: string | null
          status: string | null
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          country_code?: string | null
          created_at?: string | null
          email: string
          email_verified_at?: string | null
          full_name?: string | null
          id: string
          language?: string | null
          last_login_at?: string | null
          phone?: string | null
          status?: string | null
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          country_code?: string | null
          created_at?: string | null
          email?: string
          email_verified_at?: string | null
          full_name?: string | null
          id?: string
          language?: string | null
          last_login_at?: string | null
          phone?: string | null
          status?: string | null
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
