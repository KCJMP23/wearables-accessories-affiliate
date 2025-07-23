import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Simple database health check
    // In a real implementation, you would test the database connection
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: {
        status: 'connected',
        responseTime: 5 // Mock response time in ms
      },
      details: {
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development'
      }
    };

    return NextResponse.json({
      success: true,
      data: healthStatus
    });
  } catch (error) {
    console.error('Database health check failed:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Database health check failed',
      data: {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        database: {
          status: 'disconnected',
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      }
    }, { status: 503 });
  }
} 