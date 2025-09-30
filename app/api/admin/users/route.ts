import { NextResponse } from "next/server";
import { dbAdmin } from "@/lib/firebaseAdmin";
import { getAuth } from "firebase-admin/auth";

// Verify admin authentication
async function verifyAdmin(authHeader: string | null) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  try {
    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await getAuth().verifyIdToken(idToken);
    
    // Add your admin email check here
    const adminEmails = [process.env.ADMIN_EMAIL || 'admin@example.com'];
    
    if (!adminEmails.includes(decodedToken.email || '')) {
      return null;
    }
    
    return decodedToken;
  } catch (error) {
    console.error('Error verifying admin token:', error);
    return null;
  }
}

export async function DELETE(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const admin = await verifyAdmin(authHeader);
    
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    await dbAdmin.collection('users').doc(userId).delete();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const admin = await verifyAdmin(authHeader);
    
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userId, action } = await req.json();
    
    if (!userId || !action) {
      return NextResponse.json({ error: 'User ID and action required' }, { status: 400 });
    }

    if (action === 'clearData') {
      await dbAdmin.collection('users').doc(userId).update({
        fullName: '',
        phone: '',
        regNum: '',
        bloodStatus: '',
        status: 'pending'
      });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const admin = await verifyAdmin(authHeader);
    
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userIds, action } = await req.json();
    
    if (!userIds || !Array.isArray(userIds) || !action) {
      return NextResponse.json({ error: 'User IDs array and action required' }, { status: 400 });
    }

    const batch = dbAdmin.batch();
    
    if (action === 'bulkDelete') {
      userIds.forEach(userId => {
        const userRef = dbAdmin.collection('users').doc(userId);
        batch.delete(userRef);
      });
    }
    
    await batch.commit();
    
    return NextResponse.json({ success: true, count: userIds.length });
  } catch (error) {
    console.error('Error bulk operation:', error);
    return NextResponse.json({ error: 'Failed to perform bulk operation' }, { status: 500 });
  }
}